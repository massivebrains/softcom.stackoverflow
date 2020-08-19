const express = require('express')
var router = express.Router()
const helpers = require('../Utils/Helpers')
const { validationResult } = require('express-validator')
const RegisterRequest = require('../Validations/Auth/RegisterRequest')
const VerifyEmailRequest = require('../Validations/Auth/VerifyEmailRequest')
const LoginRequest = require('../Validations/Auth/LoginRequest')
const UserService = require('../Services/UserService')

router.get('/', (req, res) => {

    return res.json({ status: true, message: 'softcom.stackoverflow.com is running as expected', data: null })
})

router.post('/register', RegisterRequest, async (req, res, next) => {

    try{

        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(422).json(helpers.validation(errors.array()))

        let payload = req.body

        let user = await UserService.register(payload)

        return res.status(201).json({

            status: true, 
            message: `Registration successful. A verification code has been sent to ${payload.email}`, 
            data: user 

        })

    }catch(ex){

        next(ex)
    }
})

router.post('/verify', VerifyEmailRequest, async (req, res, next) => {

    try{

        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(422).json(helpers.validation(errors.array()))

        let response = await UserService.verify(req.body)

        return res.json({ status: true, message: response, data: null })

    }catch(ex){

        next(ex)
    }
})

router.post('/login', LoginRequest, async (req, res, next) => {

    try{

        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(422).json(helpers.validation(errors.array()))

        let response = await UserService.login(req.body)

        return res.json({ status: true, message: 'Login Successful', data: response })

    }catch(ex){

        next(ex)
    }
})

module.exports = router