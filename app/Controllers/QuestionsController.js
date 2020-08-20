const express = require('express')
var router = express.Router()
const helpers = require('../Utils/Helpers')
const { validationResult } = require('express-validator')
const AskRequest = require('../Validations/Questions/AskRequest')
const VoteRequest = require('../Validations/Questions/VoteRequest')
const AnswerRequest = require('../Validations/Questions/AnswerRequest')
const SubscribeRequest = require('../Validations/Questions/SubscribeRequest')
const QuestionService = require('../Services/QuestionService')

router.get('/', async (req, res, next) => {

	try{

        let questions = await QuestionService.getAll()

        return res.json({

            status: true, 
            message: `Questions retrieved successfully.`, 
            data: questions 

        })

    }catch(ex){

        next(ex)
    }
	
})

router.get('/single/:id', async (req, res, next) => {

    try{

        let question = await QuestionService.single(req.params.id)

        return res.json({

            status: true, 
            message: `Question retrieved successfully.`, 
            data: question

        })

    }catch(ex){

        next(ex)
    }
    
})

router.post('/ask', AskRequest, async (req, res, next) => {

	try{

		const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(422).json(helpers.validation(errors.array()))

        let question = await QuestionService.create(req.body, req.user)

        return res.status(201).json({

            status: true, 
            message: `Your question has now being posted successfully.`, 
            data: question 

        })

    }catch(ex){

        next(ex)
    }
	
})

router.post('/vote', VoteRequest, async (req, res, next) => {

    try{

        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(422).json(helpers.validation(errors.array()))

        let question = await QuestionService.vote(req.body, req.user)

        return res.status(201).json({

            status: true, 
            message: `Your vote has been successfully logged.`, 
            data: question 

        })

    }catch(ex){

        next(ex)
    }
    
})

router.post('/answer', AnswerRequest, async (req, res, next) => {

    try{

        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(422).json(helpers.validation(errors.array()))

        let question = await QuestionService.answer(req.body, req.user)

        return res.status(201).json({

            status: true, 
            message: `Your answer has been successfully logged.`, 
            data: question 

        })

    }catch(ex){

        next(ex)
    }
    
})



module.exports = router