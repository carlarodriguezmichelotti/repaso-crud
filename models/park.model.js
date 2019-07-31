const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
    name: String,
    description: String,
    active: Boolean
}, {
        timestamps: true
    });

module.exports = mongoose.model('Park', parkSchema)