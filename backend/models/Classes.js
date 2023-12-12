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
  isFull: {
    type: Boolean,
    default: false,
  },
});

classSchema.post("findOneAndUpdate", async function (result, next) {
  try {
    // Use `result` to access the updated document
    const updatedClass = await this.model.findOne(this.getQuery());

    if (
      updatedClass &&
      updatedClass.capacity === updatedClass.enrolledMembers.length
    ) {
      updatedClass.isFull = true;
      console.log("Class Full");
      await updatedClass.save(); // Save the updated document
    } else {
      console.log("Available");
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const GymClass = mongoose.model("gymClass", classSchema);

module.exports = GymClass;
