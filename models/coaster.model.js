const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el modelo

const coasterSchema = new Schema({
  name: String,
  description: String,
  inversions: Number,
  length: Number,
  active: Boolean,
  park_id: {type: Schema.Types.ObjectId, ref: 'Park' }
}, {
      timestamps: true
  });

module.exports = mongoose.model('Coaster', coasterSchema)