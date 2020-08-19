const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {

	console.log(req.user)
	
    return res.json({ status: true, message: 'softcom.stackoverflow.com is running as expected', data: null })
})

module.exports = router