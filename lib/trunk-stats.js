'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrunkStatsSchema = new Schema({
  trunk: { type: Schema.Types.ObjectId, ref: 'Trunk', index: true},
  captureTime: {type: Date, required: true},
  last10: {
    answers: {type: Number, required: true},
    seizures: {type: Number, required: true},
    completions: {type: Number, required: true},
    duration: {type: Number, required: true}
  },
  last30: {
    answers: {type: Number, required: true},
    seizures: {type: Number, required: true},
    completions: {type: Number, required: true},
    duration: {type: Number, required: true}
  },
  last60: {
    answers: {type: Number, required: true},
    seizures: {type: Number, required: true},
    completions: {type: Number, required: true},
    duration: {type: Number, required: true}
  },
  callsInProgress: {type: Number, required: true},
  maxCallsAllowed: Number
}, 
{ 
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
}
);

TrunkStatsSchema.index({trunk: 1, captureTime: 1}, {unique: true}) ;

TrunkStatsSchema
.virtual('last10.asr')
.get(function() {
  return this.last10.seizures > 0 ? (this.last10.answers*100/this.last10.seizures).toFixed(1) : null ;
}); 
TrunkStatsSchema
.virtual('last10.acd')
.get(function() {
  return this.last10.completions > 0 ? Math.floor(this.last10.duration/this.last10.completions) : null ;
}); 

TrunkStatsSchema
.virtual('last30.asr')
.get(function() {
  return this.last30.seizures > 0 ? (this.last30.answers*100/this.last30.seizures).toFixed(1) : null ;
}); 
TrunkStatsSchema
.virtual('last30.acd')
.get(function() {
  return this.last30.completions > 0 ? Math.floor(this.last30.duration/this.last30.completions) : null ;
}); 

TrunkStatsSchema
.virtual('last60.asr')
.get(function() {
  return this.last60.seizures > 0 ? (this.last60.answers*100/this.last60.seizures).toFixed(1) : null ;
}); 
TrunkStatsSchema
.virtual('last60.acd')
.get(function() {
  return this.last60.completions > 0 ? Math.floor(this.last60.duration/this.last60.completions) : null ;
}); 

module.exports = mongoose.model('TrunkStats', TrunkStatsSchema);