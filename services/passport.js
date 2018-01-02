const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// model class => model instance
const User = mongoose.model('users');

// identify
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// take id and turn it into a user model
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// authenicate users with google profile
passport.use(
  new GoogleStrategy(

    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },

    (accessToken, refreshToken, profile, done) => {
      // initiate a search/query of a record inside our collection
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {

          // we have a record of this user
          if (existingUser) {
            done(null, existingUser);
          }

          // we dont have this user, make a new record
          else {
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
      });      
    }
  )
);