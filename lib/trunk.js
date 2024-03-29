'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrunkSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer'},
  customerTrunkIdentifier: String,
  dtg: {type: String, required:true, index: true},
  signalingAddress: {type: String, required: true},
  signalingPort: {type: Number, default: 5060},
  capacity: Number,
  active: {type: Boolean, default: true}
});

TrunkSchema.index({customer: 1, dtg: 1}, {unique: true}) ;


TrunkSchema.pre('save', function(next) {
  if (this.isNew || !this.dtg) { return next(); }

  mongoose.model('Trunk', TrunkSchema).findOne(
    {$and: [
      {customer: this.customer, dtg: this.dtg},
      {_id: {$ne: this._id} }
    ]}, function(err, trunk) {
    if( !!trunk ) {
      return next(new Error('Duplicate key: the provided combination of customer and dtg exists') ) ;
    }
    next() ;
  }) ;
}) ;

module.exports = mongoose.model('Trunk', TrunkSchema);