const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./plan-types');

const PlanSchema = new Schema({
  title : { type: String, required: true },
  description : { type: String, required: true },
  category : { type: String, required: true },
  //creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date : { type: Date, required: true },
  location : { type: { type: String }, coordinates: [Number] },
  picPath : String,
  picName : String,
  usersAssisting: []
});

PlanSchema.index({ location: '2dsphere' });

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;
