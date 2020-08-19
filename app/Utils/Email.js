const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {

	send : async message => {

		return new Promise(async (resolve, reject) => {

			try{

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

				console.log(response)

				resolve('Message Sente successfully.')

			}catch(ex){

				reject(ex)
			}
		})
	}
}