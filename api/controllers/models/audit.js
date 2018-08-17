const mongoose = require('mongoose');

var audit = mongoose.model('audit',{
    channelName: {
    type: String,
      required: 'Kindly enter the name of channel ',
  },
  ciserviceName: {
    type: String
  },
  requestData: {
    type: Object
    },
  responseData: {
    type: Object
  },
  userName: {
    type: String
  },
  requestDate: {
    type: Date,
    required : 'Date please '
  },
  lastUpdatedDate: {
    type: Date
    }
});


module.exports= {audit};
