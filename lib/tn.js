'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var revisionSchema = new mongoose.Schema({
  createdOn: {type: Date, default: Date.now},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  transactionType: {type: String, enum: ['created','edited']},

  //these are only populated if they changed
  descr: String,
  customer: { type: Schema.Types.ObjectId, ref: 'Customer'},
  tags: {type: [String], required: false},
  callplan: {type: Schema.Types.ObjectId, ref: 'Callplan'},
  callplanVersion: Number
}) ;


var TnSchema = new Schema({
  number: { type: String, unique: true, index: true},
  descr: String,
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  tags: { type: [String], index: true },
  callplan: {type: Schema.Types.ObjectId, ref: 'Callplan', index: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  createdOn: {type: Date, default: Date.now},
  lastModifiedOn: {type: Date, default: Date.now},
  lastModifiedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  lastModifiedDetail: String,
  pristine: {type: Boolean, default: true},
  revisions: [revisionSchema]
});

TnSchema.index({customerId: 1, number: 1}) ;

TnSchema
  .pre('save', function(next) {
    if (this.isNew) { 

      this.revisions.push({
        createdBy: this.createdBy,
        transactionType: 'created'
      }) ;  

      return next(); 
    }

    //on update 
    this.pristine = false ;
    this.lastModifiedOn = new Date() ;    

    next() ;
  });

module.exports = mongoose.model('Tn', TnSchema);