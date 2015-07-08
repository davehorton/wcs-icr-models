'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrunkSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer'},
  customerTrunkIdentifier: String,
  dtg: {type: String, required:true, index: true},
  vendorTrunkIdentifier: {type: String, required: true},
  signalingAddress: {type: String, required: true},
  signalingPort: {type: Number, default: 5060},
  capacity: Number,
  active: {type: Boolean, default: true}
});

TrunkSchema.index({customer: 1, vendorTrunkIdentifier: 1}, {unique: true}) ;


TrunkSchema.pre('save', function(next) {
  if (this.isNew || !this.customerTrunkIdentifier) { return next(); }

  mongoose.model('Trunk', TrunkSchema).findOne({customer: this.customer, customerTrunkIdentifier: this.customerTrunkIdentifier}, function(err, trunk) {
    if( !!trunk ) {
      return next(new Error('Duplicate key: the provided combination of customer and customerTrunkIdentifier exists') ) ;
    }
    next() ;
  }) ;
}) ;

module.exports = mongoose.model('Trunk', TrunkSchema);