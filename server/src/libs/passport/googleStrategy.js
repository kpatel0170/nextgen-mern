/* eslint-disable consistent-return */
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import logger from "../logger.js";
import config from "../../config/config.js";

import User from "../../models/user.js";

const googleLogin = new GoogleStrategy(
  {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: `${config.siteUrls.server}${config.google.callbackURL}`,
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const oldUser = await User.findOne({ email: profile.email });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      logger.error(err);
      return done(err, null);
    }

    try {
      const newUser = await new User({
        googleId: profile.id,
        email: profile.email,
        name: profile.displayName
      }).save();
      done(null, newUser);
    } catch (err) {
      logger.error(err);
      done(err, null);
    }
  }
);

const useGoogleStrategy = (passport) => {
  passport.use(googleLogin);
};

export default useGoogleStrategy;
