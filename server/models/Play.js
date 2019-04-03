const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require("./User")

const playSchema = new Schema({
  prize: Number,
  combination: [Number],
  player: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Play = mongoose.model('Play', playSchema);
module.exports = Play;