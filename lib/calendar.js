'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CalendarSchema = new Schema({
  name: {type: String, index: true, default: 'Untitled'},
  customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  year: {type: Number, min: 2015, max: 2035, required: true},
  days: [Number]
});

CalendarSchema.index({customer: 1, name: 1}, {unique: true}) ;


module.exports = mongoose.model('Calendar', CalendarSchema);