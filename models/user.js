var mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {type:String, unique: true, require: true, trim: true},
    passWord: {type:String, require:true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;