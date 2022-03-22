const GoogleStrategy = require("passport-google-oauth20").Strategy
const e = require("express");
//const FacebookStrategy = require("passport-facebook").Strategy
const passport = require("passport");
const { User } = require("./models/models");

const GOOGLE_CLIENT_ID = "829305691828-vmpc9b1rhboskls4borf8ak4d8dkr2ht.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const getProfile = (profile) => {
  const { displayName, email } = profile;

    //const email = emails[0].value;
    //const photo = photos[0].value;

    return {
      name: displayName,
      email: email,
    };
  }


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
},
  async function (accessToken, refreshToken, profile, done) {
    try {

      const existingEmailAccount = await User.findOne({
        where: { name: getProfile(profile).name },
      })

      if (!existingEmailAccount) {
        const newAccount = await User.create(getProfile(profile))

        return done(null, newAccount)
      }
      return done(null, existingEmailAccount);


    } catch (err) {
      throw new Error(err)
    }


    //done(null, profile);
    /*const user = {
      username: profile.displayName,
      //avarat: profile.photos[0],
    };
 
    user.serializeUser*/
  }
)
);

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
