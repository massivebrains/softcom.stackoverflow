var mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (error) => {

    if (error) {

        console.log(error)

    } else {

        console.log(`Database is running without problems`)
    }

})


require('./Schemas/AnswerSchema')
require('./Schemas/OTPSchema')
require('./Schemas/QuestionSchema')
require('./Schemas/UserSchema')
require('./Schemas/ViewSchema')
require('./Schemas/VoteSchema')
require('./Schemas/SubscriptionSchema')