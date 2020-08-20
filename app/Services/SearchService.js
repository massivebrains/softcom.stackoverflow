const mongoose = require('mongoose')
const Question = mongoose.model('Question')
const User = mongoose.model('User')
const Answer = mongoose.model('Answer')

module.exports = {

	search: async (param) => {

		return new Promise(async (resolve, reject) => {

			let regex = {$regex: `.*${param}.*`, $options: 'i'} 

			let question_query = Question.find({ title: regex }).limit(10).exec()
			let answers_query = Answer.find({answer: regex }).limit(10).exec()
			let users_query = User.find({name: regex, email: regex }).limit(10).exec()

			let promises = [question_query, answers_query, users_query]

			Promise.all(promises).then(results => {

				resolve({questions: results[0], answers: results[1], users: results[2]})

			}).catch(err => {

				reject(err)
			})
		})
	}
}