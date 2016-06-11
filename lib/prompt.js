'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromptSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  name: {type: String, required: true},
  path: { type: String, required: true},
  storeType: {type: String, enum: ['aws','do'], default: 'aws', required: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  createdOn: {type: Date, default: Date.now}  
});

module.exports = mongoose.model('Prompt', PromptSchema);