require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyTokenRole = (token) => {
  let userInfo = {};

  jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return userInfo;
    }
    if (decodedToken) {
      userInfo = decodedToken;
      return userInfo;
    }
  });
  return userInfo;
};

const authorizeUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jwt exist and verify

  if (token) {
    const userInfo = verifyTokenRole(token);
    console.log(userInfo.role);
    if (userInfo.role === "member") {
      // attach the user info to the req body
      req.userInfo = userInfo;
      next();
    } else {
      res.status(403).json({ status: "Access denied" });
    }
  } else {
    res.status(401).json({ status: "Please login first" });
  }
};

const authorizeAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const userInfo = verifyTokenRole(token);
    console.log(userInfo.role);
    if (userInfo.role === "admin") {
      // attach the user info to the req body
      req.userInfo = userInfo;
      next();
    } else {
      res.status(403).json({ status: "Access denied" });
    }
  } else {
    res.status(401).json({ status: "Please login first" });
  }
};

module.exports = { authorizeUser, authorizeAdmin };
