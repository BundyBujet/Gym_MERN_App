require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyTokenRole = (token) => {
  let role = "";

  jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return role;
    }
    if (decodedToken.role === "member") {
      role = "member";
      return role;
    }
    if (decodedToken.role === "admin") {
      role = "admin";
      return role;
    }
    if (decodedToken.role === "instructor") {
      role = "instructor";
      return role;
    }
  });
  return role;
};

const authorizeUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jwt exist and verify

  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.json({ status: "Token not valid" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.json({ status: "Please login first" });
  }
};

const authorizeAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const role = verifyTokenRole(token);
    console.log(role);
    if (role === "admin") {
      next();
    } else {
      res.json({ status: "Access denied" });
    }
  } else {
    res.json({ status: "Please login first" });
  }
};

module.exports = { authorizeUser, authorizeAdmin };
