var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://massivebrains:Adeshola18@cluster0.jg6iq.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (error) => {

    if (error) {

        console.log(error)

    } else {

        console.log(`Database is running without problems`)
    }

})


require('./Schemas/UserSchema')
require('./Schemas/OTPSchema')