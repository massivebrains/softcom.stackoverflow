const { body } = require('express-validator')

module.exports = [

    body('title').not().isEmpty().isLength({ min: 20 }),

    body('body').not().isEmpty().isLength({ min: 50 })

]