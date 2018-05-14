var mongoose = require('mongoose');

var User = require('./models/user');

mongoose.connect('mongodb://localhost/mydb');

var quanCachan = new User({
    userName : 'quanCachan',
    passWord : '123'
});

quanCachan.save((err)=>{
    if (err) throw err;
    console.log('User saved successfully!')
})