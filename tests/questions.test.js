const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const faker = require('faker')

chai.use(chaiHttp)
chai.should()
chai.expect()


let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2U1ZjEzZjEwMzU4MmRjODY3YzQyYSIsIm5hbWUiOiJBZGVvbGEgVGVtaXRvcGUiLCJlbWFpbCI6ImFkZW9sYUBnbWFpbC5jbyIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA4LTIwVDExOjMxOjMxLjI0NFoiLCJpYXQiOjE1OTc5NTE1NzUsImV4cCI6MTU5Nzk1MzM3NX0.PyvcROHz0rEJ_NjI6LYeMPY-cyF6CSfC7hk4v5znAbI'
let question_id = '5f3e361269f22607c41efeb3'

describe('Questions Routes Tests', () => {

	describe('GET /questions', () => {

		it('Should get all questions', done => {

			chai
			.request(app)
			.get('/api/v1/questions')
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(200)
				res.body.should.be.a('object')
				res.body.should.have.property('status', true)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should return a single question', done => {

			chai
			.request(app)
			.get(`/api/v1/questions/single/${question_id}`)
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(200)
				res.body.should.be.a('object')
				res.body.should.have.property('status', true)
				res.body.should.have.property('data')
				done()
			})
		})
		
	})

	describe('POST /questions/ask', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/questions/ask')
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 422 with invalid title and body', done => {

			chai
			.request(app)
			.post('/api/v1/questions/ask')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({title: 'short', body: 'short'})
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should ask successfully with valid title and body', done => {

			chai
			.request(app)
			.post('/api/v1/questions/ask')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({title: faker.lorem.text(), body: faker.lorem.text() })
			.end((err, res) => {

				res.should.have.status(201)
				res.body.should.be.a('object')
				res.body.should.have.property('status', true)
				res.body.should.have.property('data')
				done()
			})
		})
	})

	describe('POST /questions/vote', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/questions/vote')
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})


		it('Should fail due to existing vote', done => {

			chai
			.request(app)
			.post('/api/v1/questions/vote')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({question_id: question_id, vote: true })
			.end((err, res) => {

				res.should.have.status(400)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})
	})

	describe('POST /questions/answer', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/questions/answer')
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})


		it('Should fail due to existing answer', done => {

			chai
			.request(app)
			.post('/api/v1/questions/answer')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({question_id: question_id, answer: 'Simple answer' })
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})
	})
})