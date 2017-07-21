const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username : { type: String, required: true },
  fullname : { type: String, required: true },
  email : { type: String, required: true },
  password  : { type: String, required: true }
  //profilePicPath : { type: String, default: "https://www.drupal.org/files/issues/default-avatar.png" },
  //profilePicName : { type: String, default: "default" },
  /*role: {
    type: String,
    enum: [
      'admin',
      'user',
    ],
    required: true
  }*/
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
