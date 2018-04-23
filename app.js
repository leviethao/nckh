var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var Account = require("./models/account");


var index = require('./routes/index');
var users = require('./routes/users');
var catalog = require("./routes/catalog");

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://127.0.0.1/nckhdb';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.engine("ejs", require("express-ejs-extend"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "mysecret"}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/users', users);
app.use("/catalog", catalog);


//================= LOGIN ===========================
app.route("/login")
.get(function (req, res) {
  res.render("login");
})
.post(passport.authenticate("local", {failureRedirect: "/login", successRedirect: "/catalog"}));

passport.use(new LocalStrategy(function (loginname, password, done) {
  Account.findOne()
  .where("loginname").equals(loginname)
  .exec(function (err, account) {
      if (err || account == null) return done(null, false);
        
      if (account.password == password) {
          return done(null, account);
      } else {
          return done(null, false);
      }
  });
}));

passport.serializeUser(function (account, done) {
  done(null, account.loginname);
});

passport.deserializeUser(function (loginname, done) {
  Account.findOne()
  .where("loginname").equals(loginname)
  .exec(function (err, account) {
      if (err || account == null) return done(null, false);
      return done(null, account);
  });
});

//================= END LOGIN ===========================



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
