const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const faker = require('faker')

chai.use(chaiHttp)
chai.should()
chai.expect()


let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2U1ZjEzZjEwMzU4MmRjODY3YzQyYSIsIm5hbWUiOiJBZGVvbGEgVGVtaXRvcGUiLCJlbWFpbCI6ImFkZW9sYUBnbWFpbC5jbyIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA4LTIwVDExOjMxOjMxLjI0NFoiLCJpYXQiOjE1OTc5NTE1NzUsImV4cCI6MTU5Nzk1MzM3NX0.PyvcROHz0rEJ_NjI6LYeMPY-cyF6CSfC7hk4v5znAbI'

describe('Search Routes Tests', () => {

	describe('GET /search/{query}', () => {

		it('Should search successfully', done => {

			chai
			.request(app)
			.get('/api/v1/search/this')
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
})