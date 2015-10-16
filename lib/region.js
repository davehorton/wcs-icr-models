'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RegionSchema = new Schema({
  name: {type: String, index: true, default: 'Untitled'},
  customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  matches: [String]
});

RegionSchema.index({customer: 1, name: 1}, {unique: true}) ;


module.exports = mongoose.model('Region', RegionSchema);