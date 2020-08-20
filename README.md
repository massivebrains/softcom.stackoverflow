# Softcom Backend Assement - Olaiya Segun

softcom.stackoverflow.com is a service that enables you to build a community without worrying about backend.

We provide the backend for managing your community engagements, questions, threads, answers, votes and lots more!

Again, welcome to softcom.stackoverflow.com!

## API Structure

This api documentation is structed based on resources. *Authentication*, *Questions*, *Search* and *Subscriptions*

> _Authentication_
You will gain access to authentication endpoints such as registration, email verification and login. Please note that we implement JWT authentication. You will be required to refresh your JWT token after 30 mins.

> _Questions_
Gain access to endpoints to ask, vote and get questions on our platform.

> _Search_
We have implemented a single endpoint to give you the power to browser our paltform through simple queries and lighting fast responses. Search and get matches for *Users*, *Questions* and *Answers*. You're welcome.

> _Subscriptions_
Users can subscribe to questions and get notified when a new answer is posted on a question. Use the suite of endpoints here to subscribe and unsubscribe from a question.

## Response Object
All our response object contains a *status*, *message* and *data* keys. To know that something is wrong first of all, you will get a non *2XX* http status code, further more the *status* key (which is boolean) will be potentially *false*

Our *data* object will already return the expected information based on the endpoint called.

## HTTP Status Codes

- *200* : Everything is fine.
- *201* : Resource successfully created
- *419* : Validation Error
- *400* : Bad reqeust often due to invalid data based on operation
- *401* : Unauthorizied. Invalid JWT Token
- *403* : Expired JWT Token
- *500* : Our fault, let us know about this.