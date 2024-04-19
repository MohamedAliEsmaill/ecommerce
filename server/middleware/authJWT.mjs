// verifyToken.mjs

import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("JWT ")
  ) {
    const token = req.headers.authorization.substring(4);
    jwt.verify(token, process.env.API_SECRET, async (err, decoded) => {
      if (err) {
        // Token verification failed
        req.user = null; //unAuth
        next();
      } else {
        try {
          const user = await User.findOne({ _id: decoded.id }).exec();
          if (!user) {
            // User not found
            req.user = null; //unAuth
          } else {
            // User found
            req.user = user;
          }
          next();
        } catch (err) {
          console.error("Error finding user:", err);
          req.user = null; //unAuth
          next();
        }
      }
    });
  } else {
    req.user = null; //unAuthorized
    next();
  }
};

export { verifyToken };
