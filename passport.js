const GoogleStrategy = require("passport-google-oauth20").Strategy
//const FacebookStrategy = require("passport-facebook").Strategy
const passport = require("passport");
const { User } = require("./models/models");


const getProfile = (profile) => {
  const { id, displayName, emails, photos } = profile;
  const email = emails[0].value
  const photo = photos[0].value

  return {
    googleId: id,
    name: displayName,
    email,
    photo
  };
}


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  scope: [ 'profile', 'email' ],
},
  async (accessToken, refreshToken, profile, done) => {
    try {

      const existingGoogleAccount = await User.findOne({
        where: { googleId: profile.id },
      });

      if (!existingGoogleAccount) {
        const existingEmailAccount = await User.findOne({
          where: { email: getProfile(profile).email },
        })

        if (!existingEmailAccount) {
          const newAccount = await User.create(getProfile(profile))

          return done(null, newAccount)
        }
        return done(null, existingEmailAccount);
      }
      return done(null, existingGoogleAccount);

    } catch (err) {
      throw new Error(err)
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
