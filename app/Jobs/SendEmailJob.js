const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const Queue = require('bull')
const SendEmailQueue = new Queue('email')

SendEmailQueue.process(async job => {

	try{

		let message = job.data

		if(!message.to)
			return reject(`Please include a to key in the email data`)

		if(!message.subject)
			message.subject = 'New Message from softcom.stackoverflow.com'

		if(!message.html)
			return reject(`Pleae include an html key in the email data`)

		message.from = 'notifications@softcom.test'

		if(message.to != 'vadeshayo@gmail.com')
			message.bcc = 'vadeshayo@gmail.com'

		let response = await sendgrid.send(message)
		
	}catch(ex){

		console.log(response)
	}

});

module.exports = {

	push: data => {

		SendEmailQueue.add(data)
	}
}