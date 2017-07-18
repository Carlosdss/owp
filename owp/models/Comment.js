/*const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  comment : { type: String, required: true },
  creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id : { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;*/
