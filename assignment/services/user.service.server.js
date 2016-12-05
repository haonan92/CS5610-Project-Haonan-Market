/**
 * Created by Haonan on 10/25/2016.
 */
module.exports = function (app, model) {

    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");



    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/facebook',
            failureRedirect: '/assignment/#/login'
        }));




        app.get('/api/user', findUser);
        app.get('/api/user/:uid', findUserbyId);
        app.post('/api/user',createUser);
        app.post('/api/checkLogin',checkLogin);

        app.get('/api/users/alluser', allUsers);
        app.put('/api/user/:uid',updateUser);
        app.delete('/api/user/:uid',deleteUser);
        app.post('/api/login',passport.authenticate('local'), login);
        app.post('/api/logout', logout);
        app.delete('/api/removeStuff/:uid/:index',removefromList);
        app.post('/api/followUser/:uid/:person',followUser);
        app.get("/api/checkfollow/:person", checkFollow);
        app.delete("/api/reomveFollowing/:username/:index", reomveFollowing);
        app.delete('/api/reomveFollower/:username/:index',reomveFollower);
        app.post('/api/register', register);
        app.put('/api/editInfo/:uid', editInfo);



    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));





    function facebookLogin(token, refreshToken, profile, done){
        model
            .userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser){
                    if(facebookUser) {
                        return done(null, facebookUser);
                    }
                    else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                id:    profile.id,
                                token: token,
                                displayName: profile.displayName
                            }
                        };
                        return model
                            .userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    console.log(user);
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }




    function editInfo(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        console.log("------------hell from edit---------")
        model
            .userModel
            .updateInfo(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                })
    }




    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        model
            .userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user) {
                        console.log("-------username name has been taken----------");
                        res.status(400).send("Username already in use.");
                        return;
                    }
                    else {
                        console.log("--------------create user-----------")
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return model
                            .userModel
                            .createUser(req.body);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
            .then(
                function(newUser) {
                    if(newUser) {
                        req.login(newUser, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(newUser);
                            }
                        });
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }




    function reomveFollower(req, res) {
        var index = req.params.index;
        var name = req.params.username;
        //console.log(index);
        model
            .userModel
            .reomveFollower(index, name)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function reomveFollowing(req, res) {
        var name = req.params.username;
        var index = req.params.index;
        model
            .userModel
            .reomveFollowing(index,name)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(err){
                    done(err, null);
                }
            );

    }


    function checkFollow(req, res) {
        var person = req.params.person;
        console.log(person);
        model
            .userModel
            .checkFollow(person)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    done(err, null);
                }
            );

    }


    function followUser(req, res) {
        console.log("-----------followUser--------------");
        var uid = req.params.uid;
        var person = req.params.person;
        //console.log(uid);
        //console.log(person);
        model.
            userModel
            .addToFriendList(uid, person)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function removefromList(req, res) {
        console.log("-----------removeStuff--------------");
        var index = req.params.index;
        var uid = req.params.uid;
        model
            .userModel
            .removefromList(index,uid)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function checkLogin(req, res) {
        console.log("----------from check login-------------");
        res.send(req.isAuthenticated() ? req.user : '0');

    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    //testing purpose
    function allUsers(req, res) {
        return model
            .userModel
            .getAllUser()
            .then(
                function(users) {
                    if(users) {
                        res.json(users);
                    }
                    else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }



    function deleteUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

    }


    function updateUser(req, res) {
        console.log("hello from user update");
        var user = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )


    }



    //for register
    function createUser(req, res) {
            var user = req.body;
            model
                .userModel
                .createUser(user)
                .then(
                    function (newUser) {
                        res.send(newUser);
                    },
                    function (error) {
                        res.sendStatus(400).sned(error);
                    }
                );
        }


        //for login
        function findUser(req, res) {
            var params = req.params;
            var query = req.query;
            if (query.password && query.username) {
                findUserByCredentials(req, res);
            }
            else if (query.username) {
                findUserByUsername(req, res);
            }
        }

        //for register
        function findUserByUsername(req, res) {
            var username = req.query.username;
            model
                .userModel
                .findUserByUsername(username)
                .then(
                    function (user) {
                        if(user) {
                            res.send(user);
                        }
                        else {
                            res.send('0');
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                )

        }


        //for login
        function findUserByCredentials(req, res) {
            var username = req.query.username;
            var password = req.query.password;
            model
                .userModel
                .findUserByCredentials(username, password)
                .then(
                    function(user){
                        if(user){
                            res.json(user);
                        } else {
                            res.send('0');
                        }
                    },
                    function(error){
                        res.sendStatus(400).send(error);
                    }
                );

        }


        //findUserById
        function findUserbyId(req, res) {
            var userId = req.params.uid;
            model
                .userModel
                .findUserById(userId)
                .then(
                    function (user) {
                        if(user) {
                            res.send(user);
                        }
                        else {
                            res.send('0');
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                )
        }


}