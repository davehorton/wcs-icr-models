'use strict' ;

var _ = require('lodash') ;
var debug = require('debug')() ;

var models = {} ;

require('fs').readdirSync(__dirname + '/lib/').forEach(function(file) {
  if (file.match(/\.js$/) !== null) {
    var modelname = _.capitalize( file.split('.')[0] );
    models[modelname] = require('./lib/' + file);
  }
});

debug('loaded models: ', models) ;

module.exports = models ;