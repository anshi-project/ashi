var passport=require("passport");
var localstrategy=require('./localstrategy');


module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user)
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
   
    passport.use("local",localstrategy)
};