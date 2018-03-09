var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./app/models/user');
var port = process.env.PORT || 8080;
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user_db');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/user')

    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        var user = new User();
        user.Username = req.body.uname;
        user.Email = req.body.email;
        user.Name = req.body.name;   
        user.save(function(err, result) {
            console.log(result);
            if (err)
                res.json({status:'error', message : 'err message'});
            else
                res.json({status:'ok', data:result._id});
        });

    })
    .get(function(req,res) {
        User.find(function(err,users) {
            if(err)
                res.send(err);
            else
            res.json(users);
        });
    });
    
router.get('/', function(req, res) {
    res.json({ message: 'get' });   
});



app.use('/api',router);

app.listen(port);
console.log('port live');