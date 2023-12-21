/* eslint-disable consistent-return */
/* eslint-disable indent */
import passport from "passport";
import ApiError from "../utils/ApiError.js";
import { ROLES_RIGHTS, HTTP_CODES, AUTH_MESSAGES } from "../config/constants.js";

const roleRights = new Map(Object.entries(ROLES_RIGHTS));

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.UNAUTHENTICATED)
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every(
        (requiredRight) => userRights.includes(requiredRight)
        // eslint-disable-next-line function-paren-newline
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(HTTP_CODES.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) =>
    new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

const googleAuthentication = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res
        .status(HTTP_CODES.UNAUTHORIZED)
        .send({ error: AUTH_MESSAGES.UNAUTHENTICATED });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default { auth, googleAuthentication };
