var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:evolvus*123@ds161336.mlab.com:61336/alexadb');
//mongoose.connect('mongodb://localhost:27017/alexadb');
//mongoose.connect('mongodb://adityaks:evolvus*123@cluster0-shard-00-00-vrmmn.mongodb.net:27017,cluster0-shard-00-01-vrmmn.mongodb.net:27017,cluster0-shard-00-02-vrmmn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')



//mongoose.connect('mongodb://adityaks:evolvus*123@cluster0-shard-00-00-vrmmn.mongodb.net:27017/test');

module.exports = {mongoose};


/*
mongodb://adityaks:<PASSWORD>@cluster0-shard-00-00-vrmmn.mongodb.net:27017,cluster0-shard-00-01-vrmmn.mongodb.net:27017,cluster0-shard-00-02-vrmmn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
*/
