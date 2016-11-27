var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test'
mongoose.connect(connectionString);


//Stuff Schema (items schema)
var StuffSchema = new mongoose.Schema({
    name: String,
    itemId: Number,
    customerRating: String,
    salePrice: String,
});


//User Schema (users)
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    facebookid: String,
    facebook: {
        token: String,
        id: String,
        displayName: String
    },
    google: {
        id: String
    },
    stuffs: [StuffSchema],
    followings: [String],
    followers: [String],
    roles:[String]

});


// represent a user's comment on a stuff
var CommentStuffSchema = new mongoose.Schema({
    username: String,
    stuffId: Number,
    comment: String,
    date: { type: Date, default: Date.now }
});


//model for a stuff
var StuffModel = mongoose.model('StuffModel', StuffSchema);

//model for a car
var UserModel = mongoose.model('UserModel', UserSchema);

// model for user to stuff comments
var CommentStuffModel = mongoose.model('CommentStuffModel', CommentStuffSchema);

//register a admin
//var haonan = new UserModel({username: "haonan92", password: "haonan92", roles: ["admin"]});
//haonan.save();



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());




////////////////////////////////////////Face book login/////////////////////////////////////////////////////////////////////////////////////

//app.get("/auth/facebook",facebookAuth);

passport.use(new LocalStrategy(localStorage));

var facebookConfig = {
    clientID        : process.env.FACEBOOK_CLIENT_ID,
    clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL     : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


function facebookStrategy(token, refreshToken, profile, done) {
    var id = profile.id;
    console.log("--------------This is profile id---------------------")
    console.log(id);
    UserModel.findOne({facebookid: id},
        function(err, user) {
        if (user) {
            console.log("--------------user found-------------------");
            return done(null, user);
        }

        else {
            console.log("-------------did not find user create one----------------------")
            var user = {
                username: profile.displayName.replace(/ /g, ''),
                facebookid: profile.id,
                facebook: {
                    id: profile.id,
                    token: token,
                    displayName: profile.displayName
                }
            };
            //can printout id and username
            console.log("user created");
            console.log(user.facebook);
            console.log(user.username);
            new UserModel({username: user.username, facebookid:user.facebookid, facebook: user.facebook, roles: ["guest"]}).save();
            return done(null, user);
        }
    })
        // .then(
        //     function (user) {
        //         return done(null,user);
        //     }
        // );
}

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#/profile/success',
        failureRedirect: '/project/#/login'
    }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));







//////////////////////////////////////////////////////////////Functions////////////////////////////////////////////////////////////




function localStorage (username, password, done) {
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if (user) {
            return done(null, user);
        }
        return done(null, false, { message: 'Unable to login' });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//login 
app.post("/login", passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

//logout
app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});


app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});


//register method
app.post("/register", function (req, res) {
    var newUser = req.body;

    UserModel.findOne({ username: newUser.username }, function (err, user) {
        if (err) { return next(err);}
        if (user) {
            res.json("user already exists");
            return;
        }

        var newUser = new UserModel({ username: req.body.username, password: req.body.password });
        newUser.roles = ['student'];    //defalt role is student
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });

    });
});



//add new stuff to favorites
app.put("/addFavorite/:username", function (req, res) {

    var name = req.params.username;
    var stuff = {
        name: req.body.name,
        customerRating: req.body.customerRating,
        salePrice: req.body.salePrice,
        itemId: req.body.itemId
    }
    UserModel.findOne({ username: name }, function (err, user) {
        user.stuffs.push(stuff);
        user.save();
    });
});



//remove stuff from stuffs
app.delete('/api/stuffs/:username/:index', function (req, res) {
    var name = req.params.username;
    var index = req.params.index;

    UserModel.findOne({ username: name }, function (err, user) {

        user.stuffs.splice(index, 1);
        user.save();
        res.json(user);
    });
});



//remove following method
app.delete('/api/following/:username/:index', function (req, res) {
    var name = req.params.username;
    var index = req.params.index;
    UserModel.findOne({ username: name }, function (err, user) {
        //get the username from user1 following
        UserModel.findOne({ username: user.followings[index]}, function (err, user2) {
            user.followings.splice(index, 1);
            user.save();
            //get the index in follower by using user1 following
            user2.followers.splice(user.followers.indexOf(user.followings[index]), 1);
            user2.save();
            res.json(user);
        });
    });
});



//remove follower method
app.delete('/api/follower/:username/:index', function (req, res) {
    var name = req.params.username;
    var index = req.params.index;
    UserModel.findOne({ username: name }, function (err, user) {
        UserModel.findOne({ username: user.followers[index] }, function (err, user2) {
            user.followers.splice(index, 1);
            user.save();
            //get the index in follower by using user1 following
            user2.followings.splice(user.followers.indexOf(user.followers[index]), 1);
            user2.save();
            res.json(user);
        });

    });
});



//like a person method
app.post('/api/follow/:username/:person', function (req, res) {
    var name = req.params.username;
    var person = req.params.person;
    UserModel.findOne({ username: name }, function (err, user) {
        UserModel.findOne({ username: person }, function (err2, user2) {



            if (user.followings.indexOf(person) !== -1) {
                res.json(user);
                return false;
            }

            if (name == person) {
                res.json(user);
                return false;
            }


            if (user2) {
                user.followings.push(person);
                user.save();
                user2.followers.push(name);
                user2.save();
                res.json(user);
                return;
            }
            else {
                res.json(user);
                return false;
            }

        });
    });
});




//find by username
app.get('/api/users/:username', function (req, res) {
    var name = req.params.username;
    UserModel.findOne({ username: name }, function (err, doc) {
        res.json(doc);
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////
//make comment on stuff

// add a comment
app.post("/submitstuffComment/:username/:itemId/:comment", function (req, res) {
    var newComment = new CommentStuffModel({
        username: req.params.username,
        stuffId: req.params.itemId,
        comment: req.params.comment
    });
    newComment.save();

    res.send(200);
});


// retrieve all the comments on a given stuff's detail page
app.get("/getStuffComments/:itemId", function (req, res) {
    CommentStuffModel.find({ stuffId: req.params.itemId }, function (err, comments) {
        res.json(comments);
    });
});


//delete comments
app.delete('/api/:id', function (req, res) {
    var id = req.params.id;

    CommentStuffModel.remove({ _id: id }, function (err, count) {
        CommentStuffModel.find(function (err, comments) {
            res.json(comments);
        });
    });
});


//check whether this person is authenticated. and protect/rest/user
var auth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else {
        next();
    }
};

//for database
app.get("/rest/user", auth ,function (req, res) {
    UserModel.find(function (err, users) {
        res.json(users);
    });
});

//for delete user

//for delete user
app.delete("/api/user/:id", function (req, res) {
    var id = req.params.id;
    UserModel.remove({ _id: id }, function (err, count) {
        UserModel.find(function (err, users) {
            res.json(users);
        });
    });
});

/*

 function facebookLogin(req, res) {
 res.send(200);
 }
 */
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);