

const mongoose = require('mongoose');

var ciservice = mongoose.model('ciservice',{
  name: {
    type: String,
      required: 'Kindly enter the name ',
  },
  accessKey: {
    type: String,
      required: 'Kindly enter the value to be blacklisted',
  },
  secretKey: {
    type: String,
      required: 'Kindly enter the value to be blacklisted',
  },
  responseCount:
  {
    type: Number,
    default:0,
      required: 'Kindly enter the value to be blacklisted',
  },
  requestCount: {
    type: Number,
    default:0,
      required: 'Kindly enter the value to be blacklisted',
  }
  });


module.exports= {ciservice};
