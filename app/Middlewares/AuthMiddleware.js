const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

	const authorization = req.headers['authorization']

	const token = authorization && authorization.split(' ')[1]

	if(token == null)
		return res.status(401).json({status: false, message: 'Unauthorized', data: null})

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {

		if(error)
			return res.status(403).json({status: false, message: 'Forbidden', data: null})

		req.user = user

		next()
	})
}