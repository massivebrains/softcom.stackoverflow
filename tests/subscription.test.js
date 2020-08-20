const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const faker = require('faker')

chai.use(chaiHttp)
chai.should()
chai.expect()


let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2U1ZjEzZjEwMzU4MmRjODY3YzQyYSIsIm5hbWUiOiJBZGVvbGEgVGVtaXRvcGUiLCJlbWFpbCI6ImFkZW9sYUBnbWFpbC5jbyIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA4LTIwVDExOjMxOjMxLjI0NFoiLCJpYXQiOjE1OTc5NTE1NzUsImV4cCI6MTU5Nzk1MzM3NX0.PyvcROHz0rEJ_NjI6LYeMPY-cyF6CSfC7hk4v5znAbI'
let question_id = '5f3e361269f22607c41efeb3'

describe('subscriptions Routes Tests', () => {

	
	describe('POST /subscriptions/subscribe', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/subscriptions/subscribe')
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 422 with invalid question_id', done => {

			chai
			.request(app)
			.post('/api/v1/subscriptions/subscribe')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({question_id: 'invalid'})
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should subscribe successfully with valid question_id', done => {

			chai
			.request(app)
			.post('/api/v1/subscriptions/subscribe')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({question_id: question_id })
			.end((err, res) => {

				res.should.have.status(201)
				res.body.should.be.a('object')
				res.body.should.have.property('status', true)
				res.body.should.have.property('data')
				done()
			})
		})
	})

	describe('POST /subscriptions/unsubscribe', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.put('/api/v1/subscriptions/unsubscribe')
			.set('Authorization', `Bearer ${token}`)
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 422 with invalid question_id', done => {

			chai
			.request(app)
			.put('/api/v1/subscriptions/unsubscribe')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({question_id: 'invalid'})
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should unsubscribe successfully with valid question_id', done => {

			chai
			.request(app)
			.put('/api/v1/subscriptions/unsubscribe')
			.set('content-type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send({question_id: question_id })
			.end((err, res) => {

				res.should.have.status(200)
				res.body.should.be.a('object')
				res.body.should.have.property('status', true)
				res.body.should.have.property('data')
				done()
			})
		})
	})
})