const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },

    answer: { type: String, required: 'Answer is required' },

    accepted: { type: Boolean, default: false }
    
}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} })

mongoose.model('Answer', Schema)