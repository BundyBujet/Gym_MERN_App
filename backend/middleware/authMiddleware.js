require("dotenv").config();
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
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

module.exports = { requireAuth };
