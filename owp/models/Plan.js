const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./plan-types');

const PlanSchema = new Schema({
  title : { type: String, required: true },
  description : { type: String, required: true },
  category : { type: String, enum: TYPES, required: true },
  creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date : { type: Number, required: true },
  //location : { type: { type: String }, coordinates: [Number] },
  //picPath : { type: String, required: true },
  //picName : { type: String, required: true }
});

PlanSchema.index({ location: '2dsphere' });

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;
