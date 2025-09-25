const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0].value;
    // try find by googleId or by email (link if existing local user)
    let user = await User.findOne({ googleId: profile.id }) || await User.findOne({ email });

    if (!user) {
      user = new User({
        googleId: profile.id,
        email,
        name: profile.displayName,
        provider: 'google'
      });
      await user.save();
    } else {
      // if user exists but no googleId, link it
      if (!user.googleId) {
        user.googleId = profile.id;
        user.provider = 'google';
        await user.save();
      }
    }
    return done(null, user);
  } catch (err) {
    console.error('Passport Google error', err);
    return done(err, null);
  }
}));
