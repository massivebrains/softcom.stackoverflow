const mongoose = require('mongoose')
const User = mongoose.model('User')
const OTP = mongoose.model('OTP')
const Bcrypt = require('bcryptjs')
const Helpers = require('../Utils/Helpers')
const SendEmailJob = require('../Jobs/SendEmailJob')
const jwt = require('jsonwebtoken')

module.exports = {

	register: async (payload) => {

		return new Promise(async (resolve, reject) => {

			var user = new User({

				name: payload.name,
				email: payload.email,
				password: Bcrypt.hashSync(payload.password, 10),
				status: 'inactive'
			})

			user = await user.save()

			var otp = new OTP({

				user: user,
				otp: Helpers.random_number(),
				status: 'inactive'

			})

			otp = await otp.save()

			let subject = 'You are one step away from activating your email on softcom.stackoverflow.com'
			let html = `Welcome to softcom.stackoverflow.com! <br> <br> To activate your account, use the OTP below <br> <br> <h1> ${otp.otp}`

			SendEmailJob.push({to: user.email, subject, html })

			resolve(user)
		})
	},

	verify: async (payload) => {

		return new Promise(async (resolve, reject) => {

			let user = await User.findOne({email: payload.email}).exec()

			if(!user)
				return reject('Invalid email address.')

			if(user.status != 'inactive')
				return reject('Your account has already been verified')

			let otp = await OTP.findOneAndRemove({user: user, otp: payload.otp }).exec()
			
			if(!otp || otp.status != 'inactive')
				return reject('Invalid OTP Provided')

			otp.status = 'active'
			otp.save()

			user.status = 'active'
			user.save()

			resolve('Account successfully verified. You can now login.')
		})
	},

	login: async (payload) => {

		return new Promise(async (resolve, reject) => {

			let user = await User.findOne({email: payload.email }).exec()

			if(!user || !Bcrypt.compareSync(payload.password, user.password))
				return reject('Invalid email or password')

			if(user.status == 'inactive')
				return reject('Your account is currently inactive. Behave.')
			
			let jwt_payload = {

				id: user._id,
				name: user.name,
				email: user.email,
				status: user.status,
				created_at: user.created_at
			}
			
			let jwt_token = jwt.sign(jwt_payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'})

			resolve({jwt_token})
		})
	}
}