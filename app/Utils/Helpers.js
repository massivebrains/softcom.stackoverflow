module.exports = {

	validation : (errors) => {

		return {

			status: false,
			message: 'Validation Error (ER001)',
			data: errors
		}
	},

	random_number: () => {

		return Math.floor(1000 + Math.random() * 9000)
	}
}