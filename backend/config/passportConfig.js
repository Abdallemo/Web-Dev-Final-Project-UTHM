// config/passportConfig.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/userModel');

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username});
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
