var passport=require("passport");
var adminStrategy=require('./admin.localstrategy');
var gmStrategy=require("./manager.localstrategy");

module.exports = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user)
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
   
    passport.use("admin-local",adminStrategy)
    passport.use("manager-local",gmStrategy)
};