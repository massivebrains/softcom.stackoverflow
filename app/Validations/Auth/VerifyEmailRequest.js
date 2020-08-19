const { body } = require('express-validator')

module.exports = [

    body('email').not().isEmpty().isEmail(),

    body('otp').not().isEmpty().isLength({ min: 4 }).isNumeric()

]