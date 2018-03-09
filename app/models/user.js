var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var userschema   = new Schema({
    Username: {type:String,
        unique: true},
    Email : {type: String,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']},
    Name : {type: String,
        unique: true}
});

module.exports = mongoose.model('User', userschema);