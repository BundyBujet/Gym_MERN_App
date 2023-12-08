require("dotenv").config();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", username: "" };

  // incorrect email
  if (err.message === "Wrong email") {
    errors.email = "Email is't registered";
    return errors;
  }
  // incorrect password
  if (err.message === "Wrong password") {
    errors.password = "Password wrong";
    return errors;
  }

  //validate duplicate email
  if (err.code === 11000 && err.message.includes("email")) {
    errors.email = "email already exist";
    return errors;
  }
  //validate duplicate username
  if (err.code === 11000 && err.message.includes("username")) {
    errors.username = "user name already exist";
    return errors;
  }

  // validate errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};

const maxAge = 3 * 24 * 60 * 60; //3 days time in sec

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.TOKEN_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { email, password, username, profile } = req.body;
  try {
    // await creating user in DB
    const user = await User.create({
      email,
      password,
      username,
      profile,
    });

    // generate a jwt
    const token = createToken(user._id, user.role);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // send user obj back
    res.status(200).json({ user: user._id, profile: user.profile });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
};

module.exports.admin_signup_post = async (req, res) => {
  const { email, password, username, profile, role } = req.body;
  try {
    // await creating user in DB
    const user = await User.create({
      email,
      password,
      username,
      profile,
      role,
    });

    // generate a jwt
    const token = createToken(user._id, user.role);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // send user obj back
    res.status(200).json({ user: user._id, profile: user.profile });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id, user.role);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ user: user._id, profile: user.profile });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    res.cookie("jwt", "", { maxAge: 3 });
    res.json({ status: "logout success" });
  } else {
    res.json({ status: "already logout" });
  }
};