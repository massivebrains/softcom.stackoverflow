const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    title: { type: String, required: 'The title is required' },

    body: { type: String, required: 'The body is required' },

    tags: {type: String },

    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'View' }],

    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],

    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],

    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],

}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} })

mongoose.model('Question', Schema)