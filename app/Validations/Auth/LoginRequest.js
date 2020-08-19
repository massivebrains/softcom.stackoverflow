const { body } = require('express-validator')

module.exports = [

    body('email').not().isEmpty().isEmail(),

    body('password').not().isEmpty()

]