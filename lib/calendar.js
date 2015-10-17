'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CalendarSchema = new Schema({
  name: String,
  customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
  days: {type: Object, required: true}
});


/* days: object associating years to an array of days of year:
  e.g.:

  { 
    '2015': [1,54, 66], 
    '2016': [1, 55, 67]
  }
*/
module.exports = mongoose.model('Calendar', CalendarSchema);