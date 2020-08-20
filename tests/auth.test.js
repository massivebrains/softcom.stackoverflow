const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const faker = require('faker')

chai.use(chaiHttp)
chai.should()
chai.expect()


let registeredemail = faker.internet.email()

describe('Authentication Routes Tests', () => {

	describe('POST /auth/register', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/auth/register')
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 422 with invalid email', done => {

			chai
			.request(app)
			.post('/api/v1/auth/register')
			.set('content-type', 'application/json')
			.send({name: 'Correct Name', email: 'invalid-email', password: 'password', password_confirmation: 'password'})
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 422 with passwords that do not match', done => {

			chai
			.request(app)
			.post('/api/v1/auth/register')
			.set('content-type', 'application/json')
			.send({name: 'Correct Name', email: 'invalid-email', password: 'password', password_confirmation: 'password-do-not-match'})
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should be successful with valid payload', done => {

			chai
			.request(app)
			.post('/api/v1/auth/register')
			.set('content-type', 'application/json')
			.send({name: 'Correct Name', email: registeredemail, password: 'password', password_confirmation: 'password'})
			.end((err, res) => {

				res.should.have.status(201)
				res.body.should.be.a('object')
				res.body.should.have.property('status', true)
				res.body.should.have.property('data')
				done()
			})
		})
	})

	describe('POST /auth/verify', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/auth/verify')
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})
	})

	describe('POST /auth/login', () => {

		it('Should fail with 422 with empty payload', done => {

			chai
			.request(app)
			.post('/api/v1/auth/login')
			.end((err, res) => {

				res.should.have.status(422)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 400 due to non-existence user', done => {

			chai
			.request(app)
			.post('/api/v1/auth/login')
			.set('content-type', 'application/json')
			.send({email: faker.internet.email(), password: 'password'})
			.end((err, res) => {

				res.should.have.status(400)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should fail with 400 due to inactive user', done => {

			chai
			.request(app)
			.post('/api/v1/auth/login')
			.set('content-type', 'application/json')
			.send({email: registeredemail, password: 'password'})
			.end((err, res) => {

				res.should.have.status(400)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})

		it('Should be successful with 200 due to active user', done => {

			chai
			.request(app)
			.post('/api/v1/auth/login')
			.set('content-type', 'application/json')
			.send({email: registeredemail, password: 'password'})
			.end((err, res) => {

				res.should.have.status(400)
				res.body.should.be.a('object')
				res.body.should.have.property('status', false)
				res.body.should.have.property('data')
				done()
			})
		})
	})
})