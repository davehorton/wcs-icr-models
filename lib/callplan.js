'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CallplanSchema = new Schema({
    name: {type: String, index: true, default: 'untitled'},
    descr: String,
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
    tags: [{type: String, index: true}],
    pristine: {type: Boolean, default: true},
    revisions: [{
        notes: String,
        createdOn: {type: Date, default: Date.now},
        createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
        route: {
            type: {type: String, enum: ['pstn', 'trunk', 'percent'], required: true},
            defaultPstn: {type: String},
            defaultTrunks: [
                {
                    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk'},
                    percent: {type: Number, min: 1, max: 100, default: 100, required: true}
                }
            ]            
        }
    }]
}) ;

CallplanSchema
  .pre('save', function(next) {
    if( this.isNew ) { 
        return next(); 
    }

    //on update 
    this.pristine = false ;

    next() ;
  });


module.exports = mongoose.model('Callplan', CallplanSchema);