const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let mong = mongoose.connect("mongodb+srv://admin:admin123@cluster0.zgxwc.mongodb.net/keeperDB?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true},
 (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});