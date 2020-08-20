const express = require('express')
const cors = require('cors')
const winston = require('winston')
const bodyparser = require('body-parser')
const AuthMiddleware = require('./app/Middlewares/AuthMiddleware')
const AuthController = require('./app/Controllers/AuthController')
const HomeController = require('./app/Controllers/HomeController')
const UsersController = require('./app/Controllers/UsersController')
const QuestionsController = require('./app/Controllers/QuestionsController')
const AnswersController = require('./app/Controllers/AnswersController')
const SearchController = require('./app/Controllers/SearchController')
const SubscriptionsController = require('./app/Controllers/SubscriptionsController')

const logger = winston.createLogger({

    transports: [

        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ formt: winston.format.simple() })
    ]
})


module.exports = app => {

    app.use(express.json())
    app.use(bodyparser.urlencoded({ extended: true }))
    app.use(cors())

    process.on('unhandledException', ex => logger.error(ex.message, ex))
    process.on('unhandledRejection', ex => logger.error(ex.message, ex))

    app.use((req, res, next) => {

        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        next()
    })

    app.use('/', HomeController)
    app.use('/api/v1/search', SearchController)
    app.use('/api/v1/auth', AuthController)
    app.use('/api/v1/questions', AuthMiddleware, QuestionsController)
    app.use('/api/v1/answers', AuthMiddleware, AnswersController)
    app.use('/api/v1/users', AuthMiddleware, UsersController)
    app.use('/api/v1/subscriptions', AuthMiddleware, SubscriptionsController)

    app.use((err, req, res, next) => {

        logger.error(err, err)

        return res.status(400).json({ status: false, message: err, data: null })
    })

}