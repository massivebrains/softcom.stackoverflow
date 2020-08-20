const mongoose = require('mongoose')
const Question = mongoose.model('Question')
const User = mongoose.model('User')
const Answer = mongoose.model('Answer')

module.exports = {

	search: async (param) => {

		return new Promise(async (resolve, reject) => {

			let question_query = Question.find({title: param, body: param}).lean().exec()
			let answers_query = Answer.find({answer: param}).lean().exec()
			let users_query = User.find({name: param, email: param}).lean().exec()

			let promises = [question_query, answers_query, users_query]

			Promise.all(promises).then(results => {

				resolve({questions: results[0], answers: results[1], users: results[2]})

			}).catch(err => {

				reject(err)
			})
		})
	}
}