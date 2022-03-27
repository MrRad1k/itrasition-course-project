const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const GithubStrategy = require("passport-github2").Strategy;
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
  scope: ['profile', 'email'],
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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ where: { githubId: profile.id } }).then((data, err) => {

        if (!data) return User.create({
          name: profile.username,
          email: profile._json.email,
          photo: profile._json.avatar_url,
          githubId: profile.id,
        }).then((data, err) => {
          return done(null, data);
        });
        else return done(null, data);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
