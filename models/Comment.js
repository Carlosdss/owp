const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  text : { type: String, required: true },
  //creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id : { type: Schema.Types.ObjectId, ref:'Plan', required: true },
  creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('commentSchema', commentSchema);
module.exports = Comment;
