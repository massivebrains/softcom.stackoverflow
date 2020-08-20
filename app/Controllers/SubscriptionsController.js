const express = require('express')
var router = express.Router()
const helpers = require('../Utils/Helpers')
const { validationResult } = require('express-validator')
const SubscribeRequest = require('../Validations/Questions/SubscribeRequest')
const SubscriptionService = require('../Services/SubscriptionService')


router.post('/subscribe', SubscribeRequest, async (req, res, next) => {

	try{

		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(422).json(helpers.validation(errors.array()))

		let subscription = await SubscriptionService.subscribe(req.body, req.user)

		return res.status(201).json({

			status: true, 
			message: `Your have successfully subscribed to this question. You will get notifications when a new answer is submitted.`, 
			data: subscription 

		})

	}catch(ex){

		next(ex)
	}

})

router.put('/unsubscribe', SubscribeRequest, async (req, res, next) => {

	try{

		const errors = validationResult(req)

		if (!errors.isEmpty())
			return res.status(422).json(helpers.validation(errors.array()))

		let subscription = await SubscriptionService.unsubscribe(req.body, req.user)

		return res.json({

			status: true, 
			message: `Your have successfully unsubscribed from this question.`, 
			data: null 

		})

	}catch(ex){

		next(ex)
	}

})

module.exports = router