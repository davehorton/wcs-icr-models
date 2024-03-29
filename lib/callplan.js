'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CallplanSchema = new Schema({
    name: {type: String, index: true, default: 'Untitled'},
    descr: String,
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
    tags: [{type: String, index: true}],
    pristine: {type: Boolean, default: true},
    revisions: [{
        notes: String,
        createdOn: {type: Date, default: Date.now},
        createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
        route: {
            type: {type: String, enum: ['tel', 'trunk', 'percent'], required: true},
            dnis: {type: String},
            tel: {type: String},
            trunk: [
                {
                    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk'}
                }
            ],         
            percent: [
                {
                    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk'},
                    tel: String,
                    percent: {type: Number, min: 1, max: 100, default: 100, required: true}
                }
            ]            
        },
        scenarios: [
            {
                descr: String,
                clause: [
                    {
                        type: {type: String, required: true, enum: ['condition','join']},
                        conditionType: {type: String, required: true, enum: ['and','or','doy','tod','region']},
                        dow: [Boolean], 
                        tod: [
                            {
                                open: {type: Number, min: 0, max: 86400},
                                close: {type: Number, min: 0, max: 86400}
                            }
                        ],
                        doy: {type: Schema.Types.ObjectId, ref: 'Calendar'},
                        region: {type: Schema.Types.ObjectId, ref: 'Region'}
                    }
                ],
                route: {
                    type: {type: String, enum: ['tel', 'trunk', 'percent'], required: true},
                    dnis: {type: String},
                    tel: {type: String},
                    trunk: [
                        {
                            trunk: {type: Schema.Types.ObjectId, ref: 'Trunk'}
                        }
                    ],         
                    percent: [
                        {
                            trunk: {type: Schema.Types.ObjectId, ref: 'Trunk'},
                            tel: String,
                            percent: {type: Number, min: 1, max: 100, default: 100, required: true}
                        }
                    ]            
                }
            }
        ]
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