const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const instructorSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: [true, "Please enter a user name"],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "password should be mode the 6 letters"],
  },
  role: {
    type: String,
    enum: ["admin", "instructor", "member"],
    default: "instructor",
  },
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
  },
});

//fire a function before creating the user
// this => User so you must use a normal function and not an arrow one
instructorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to logion user
instructorSchema.statics.login = async function (email, password) {
  const instructor = await this.findOne({ email });

  if (instructor) {
    console.log(instructor.password);
    const auth = await bcrypt.compare(password, instructor.password);
    if (auth) {
      return instructor;
    }
    throw Error("Wrong password");
  }
  throw Error("Wrong email");
};

// mongoose uses the model name pluralize it -users- and search for in the database
const Instructor = mongoose.model("instructor", instructorSchema);

module.exports = Instructor;
