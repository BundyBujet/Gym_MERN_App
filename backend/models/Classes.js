const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor", // Reference to the instructor model for enrolled members
    required: true,
  },
  description: String,
  schedule: {
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  capacity: {
    type: Number,
    default: 10, // Default capacity, adjust as needed
  },
  enrolledMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the user model for enrolled members
    },
  ],
});

const GymClass = mongoose.model("gymClass", classSchema);

module.exports = GymClass;
