const mongoose = require('mongoose')
const Question = mongoose.model('Question')
const User = mongoose.model('User')
const Vote = mongoose.model('Vote')
const Answer = mongoose.model('Answer')
const Email = require('../Utils/Email')

module.exports = {

	getAll: async () => {

		return new Promise(async (resolve, reject) => {

			let questions = await Question.find().sort('-date').exec()

			resolve(questions)
		})
	},

	create: async (payload, user) => {

		return new Promise(async (resolve, reject) => {

			user = await User.findById(user.id).exec()

			if(!user)
				return reject('Invalid user. Cannot create question')

			var question = new Question({

				user: user,
				title: payload.title,
				body: payload.body,
				tags: payload.tags || ''
			})

			question = await question.save()

			let subject = `Your question  has been posted on softcom.stackoverflow.com - ${question.title}`
			await Email.send({to: user.email, subject, html: subject })

			resolve(question)
		})
	},

	vote: async (payload, user) => {

		return new Promise(async (resolve, reject) => {

			user = await User.findById(user.id).exec()

			if(!user)
				return reject('Invalid user. Cannot vote on question')

			question = await Question.findById(payload.question_id).exec()

			if(user._id.toString() === question.user._id.toString())
				return reject('Really? You wanna vote on your own question? - Nah fam.')

			let previous_vote = await Vote.findOne({user: user, question: question}).exec()

			if(previous_vote)
				return reject(`Ok, here is the thing, we do not allow duplicate votes. You voted on this question on ${previous_vote.created_at} What else you want na? Please please please lets be guided.`)
			
			var vote = new Vote({

				user: user,
				question: question,
				vote: payload.vote
			})

			vote = await vote.save()

			question = await Question.findByIdAndUpdate(question._id, {

				$push: {

					votes: vote
				}

			}, {new: true}).exec()

			resolve(question)
		})
	},

	answer: async (payload, user) => {

		return new Promise(async (resolve, reject) => {

			user = await User.findById(user.id).exec()

			if(!user)
				return reject('Invalid user. Cannot answer question')

			question = await Question.findById(payload.question_id).exec()
			
			var answer = new Answer({

				user: user,
				question: question,
				answer: payload.answer
			})

			answer = await answer.save()

			question = await Question.findByIdAndUpdate(question._id, {

				$push: {

					answers: answer
				}

			}, {new: true}).populate(['answers', 'votes']).exec()

			resolve(question)
		})
	},
}