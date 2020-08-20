const { body } = require('express-validator')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = [

    body('name').not().isEmpty(),

    body('email').not().isEmpty().isEmail().custom(async (value, {req}) => {

         let user = await User.find({email: value}).exec()

         if(user.length)
            throw new Error('This email already exists. Please choose another email.')

        return true
    }),

    body('password').not().isEmpty().isLength({ min: 7 }),

    body('password_confirmation').not().isEmpty().isLength({ min: 7 }).custom((value, {req}) => {

         if(value !== req.body.password)
          throw new Error('Password confirmation does not match password')

        return true
    })

]
