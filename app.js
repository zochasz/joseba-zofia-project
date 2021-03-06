const express           = require('express');
const path              = require('path');
const favicon           = require('serve-favicon');
const logger            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const expressLayouts    = require('express-ejs-layouts');
const passport          = require('passport');
const session           = require('express-session');
const MongoStore        = require('connect-mongo')(session);
const LocalStrategy     = require('passport-local').Strategy;
const bcrypt            = require('bcrypt');
const mongoose          = require('mongoose');
                          require("dotenv").config();

const googleMapsClient  = require('@google/maps').createClient({
  key: process.env.GOOGLE_APIKEY
});

mongoose.connect(process.env.MONGODB_URI);

const User = require('./models/user');
const Event = require('./models/event');
const ProductTypes = require('./models/product-types');

const eventRoutes = require('./routes/event.js');
const indexRoutes = require('./routes/index.js');
const producerRoutes = require('./routes/producer.js');
const authRoutes = require('./routes/auth.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components/')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tomatoopdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Signing Up
passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, next) => {
    process.nextTick(() => {
     ProductTypes.find({}, (err, productTypes) => {
      if (err) {
        return next(err);
      }
      User.findOne({
        'username': username
      }, (err, user) => {
        if (err) {
          return next(err);
        }

        if (user) {
          return next(null, false);
        } else {
          const {
            username,
            email,
            name,
            password,
            isProducer,
            street,
            streetNo,
            zipCode,
            city,
            country,
            description,
            url,
            phoneNo
          } = req.body;
          const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

          if (isProducer) {
            let products = [];
            const reqBodyKeys = Object.keys(req.body);
            productTypes.forEach((type) => {
               if (reqBodyKeys.indexOf(type._id.toString()) !== -1) {
                 products.push(type._id);
               }
            });

            const calculatedAddress = street + " " + streetNo + " " + zipCode + " " + city + " " + country;

            googleMapsClient.geocode({
              address: calculatedAddress
            }, function (err, res) {
              if (!err) {
                const latitude = res.json.results[0].geometry.location.lat;
                const longitude = res.json.results[0].geometry.location.lng;

                const newUser = new User({
                  username,
                  email,
                  name,
                  password: hashPass,
                  isProducer,
                  address: {
                    street,
                    streetNo,
                    zipCode,
                    city,
                    country,
                    latitude,
                    longitude
                  },
                  description,
                  url,
                  phoneNo,
                  products
                });
                newUser.save((err) => {
                  if (err) {
                    next(err);
                  }
                  return next(null, newUser);
                });
              }
            });
          } else {
            const newUser = new User({
              username,
              email,
              name,
              password: hashPass,
              isProducer
            });
            newUser.save((err) => {
              if (err) {
                next(err);
              }
              return next(null, newUser);
            });
          }
        }
      });
    });
  });
}));

passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: "Incorrect username"
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {
        message: "Incorrect password"
      });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  if (res.locals.isAuthenticated) {
    res.locals.username = req.user.username;
    res.locals.isProducer = req.user.isProducer;
  }
  next();
});

app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/event', eventRoutes);
app.use('/producer', producerRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
