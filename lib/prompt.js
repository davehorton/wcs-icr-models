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


// customer + path and customer + name must be unique

PromptSchema.pre('save', function(next) {
  var self = this ;
  if (!this.isNew) { return next(); }

  mongoose.model('Prompt', PromptSchema).findOne({customer: this.customer, path: this.path}, function(err, prompt) {
    if( !!prompt ) {
      return next(new Error('Duplicate key: the provided combination of customer and prompt path exists') ) ;
    }

    mongoose.model('Prompt', PromptSchema).findOne({customer: self.customer, name: self.name}, function(err, prompt2) {
      if( !!prompt2 ) {
        return next(new Error('Duplicate key: the provided combination of customer and prompt name exists') ) ;
      }

      next() ;
    }) ;
  }) ;
}) ;

module.exports = mongoose.model('Prompt', PromptSchema);