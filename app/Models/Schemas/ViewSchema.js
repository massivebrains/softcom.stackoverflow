const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} })

mongoose.model('View', Schema)