'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beneficiary = new Schema({
 cifid:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
benefcifid:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
 benefname:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
 benefaccount:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
  enabled: {
    type: Number,
        default : 1
  }
});





module.exports = mongoose.model('beneficiary', beneficiary);
//module.exports = mongoose.model('diag_registration', diag_registration);
