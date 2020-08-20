const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {

    return res.json({ status: true, message: 'softcom.stackoverflow.com is running as expected', data: {documentation: 'https://documenter.getpostman.com/view/1050902/T1LTejEJ'} })
})

module.exports = router