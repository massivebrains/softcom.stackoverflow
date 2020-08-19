const express = require('express')
const app = express()
require('./app/Models/DB')
require('dotenv').config()

require('./init')(app)


const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Magic happens on port ${port}`))