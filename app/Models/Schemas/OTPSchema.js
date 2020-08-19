const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    otp: { type: String, required: true },

    status: {type: String, enum: ['active', 'inactive'], default: 'inactive' },

}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} })

mongoose.model('OTP', Schema)