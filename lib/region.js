'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RegionSchema = new Schema({
  name: String,
  customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  matches3: [String],
  matches6: [String],
  matches9: [String]
});


module.exports = mongoose.model('Region', RegionSchema);