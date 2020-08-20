const { body } = require('express-validator')
const mongoose = require('mongoose')
const Question = mongoose.model('Question')

module.exports = [

    body('question_id').not().isEmpty().isLength({ min: 20 }).custom(async (value, {req}) => {

         let question = await Question.findById(value).exec()

         if(!question)
            throw new Error('Invalid Question ID')

        return true
    }),

    body('answer').not().isEmpty().isLength({ min: 20 })

]