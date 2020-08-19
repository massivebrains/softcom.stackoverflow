const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    name: { type: String, required: 'The display name is required' },

    email: { type: String, required: 'Email is required' },

    password: {type: String, required: 'Password is required' },

    status: {type: String, enum: ['active', 'inactive'], default: 'inactive' },

}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} })

mongoose.model('User', Schema)