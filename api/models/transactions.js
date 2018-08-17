'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactions = new Schema({
	 drcif:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
},
 draccount:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
 craccount:{
  type: String,
  required: true,
  trim: true,
  minlength: 1
},
 amount:{
  type: Number,
  required: true,
  trim: true,
  minlength: 1
}
});





module.exports = mongoose.model('transactions', transactions);
//module.exports = mongoose.model('diag_registration', diag_registration);
