const { body } = require('express-validator')

module.exports = [

    body('title').not().isEmpty().isLength({ min: 5 }),

    body('body').not().isEmpty().isLength({ min: 10 })

]