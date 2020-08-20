const mongoose = require('mongoose')
const Question = mongoose.model('Question')
const User = mongoose.model('User')
const Subscription = mongoose.model('Subscription')
const SendEmailJob = require('../Jobs/SendEmailJob')

module.exports = {

	subscribe: async (payload, user) => {

		return new Promise(async (resolve, reject) => {

			user = await User.findById(user.id).exec()

			if(!user)
				return reject('Invalid user. Cannot subscribe question')

			question = await Question.findById(payload.question_id).exec()

			subscription = await Subscription.findOne({user, question}).exec()

			if(subscription)
				return reject('You have already subscribed to this question')
			
			var subscription = new Subscription({

				user: user,
				question: question
			})

			subscription = await subscription.save()

			question = await Question.findByIdAndUpdate(question._id, {

				$push: {

					subscriptions: subscription
				}

			}, {new: true}).exec()

			resolve(subscription)
		})
	},

	unsubscribe: async (payload, user) => {

		return new Promise(async (resolve, reject) => {

			user = await User.findById(user.id).exec()

			if(!user)
				return reject('Invalid user. Cannot subscribe question')

			question = await Question.findById(payload.question_id).exec()

			subscription = await Subscription.deleteOne({user, question}).exec()
			
			resolve(true)
		})
	},

	notify: async (question, answer) => {

		return new Promise(async (resolve, reject) => {

			let subscriptions = await Subscription.find({question: question}).populate('user').exec()

			if(subscriptions.length < 1)
				return resolve(true)

			subscriptions.map(async row => {

				let subject = `A new answer has been posted for question: ${question.title}`
				let html = `Answer: ${answer.answer}`

				SendEmailJob.push({to: row.user.email, subject, html })
			})
			
			resolve(true)
		})
	}
}