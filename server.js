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
            if (err)
                res.json({status:'error', message : 'err message'});

            res.json({status:'ok', data : result._id});
        });

    })
    .get(function(req,res) {
        User.find(function(err,users) {
            if(err)
                res.send(err);

            res.json(users);
        });
    });
router.route('/user/:userid')
    .get(function(req,res){
        User.findById(req.params.userid,function(err,user){
            if(err)
                res.json({status : 'error' ,message : 'err message'});

            res.json({status : 'ok' , data : user});
        });
    })
    .put(function(req,res){
        User.findById(req.params.userid,function(err,user){
            if(err)
                res.json({status :  'error' ,message : 'err message'});

            user.Email = req.body.email;
            user.Name = req.body.name;
            user.Username = req.body.uname;
            user.save(function(err,result){
                if (err)
                    res.json({status:'error', message : 'err message'});

                res.json({status:'ok', data : result._id});
            });
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.userid
        }, function(err, user) {
            if (err)
                res.json({status:'error', message : 'err message'});

            res.json({status:'ok', data : null});
        });
    });
    
    router.get('/', function(req, res) {
    res.json({ message: 'get' });   
    });



app.use('/api',router);

app.listen(port);
console.log('port live');