'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PromptSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  name: String,
  fileName: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  createdOn: {type: Date, default: Date.now}  
});

module.exports = mongoose.model('Prompt', PromptSchema);