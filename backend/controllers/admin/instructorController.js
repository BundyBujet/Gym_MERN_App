const Instructor = require("../../models/Instructor");

module.exports.get_All_instructors = async (req, res) => {
  try {
    // query all users in the Database
    const allInstructor = await Instructor.find(
      {},
      { username: 1, profile: 1, _id: 1, role: 1 }
    );

    if (!allInstructor) {
      res.status(404).json({ status: "No Instructor In DB" });
    }
    res.status(200).json(allInstructor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.get_One_instructor = async (req, res) => {
  const instructorId = req.params.instructorId;

  try {
    // check for user
    const existingUser = await Instructor.findOne(
      { _id: instructorId },
      { password: 0 }
    );

    if (!existingUser) {
      return res.status(404).json({ status: "Instructor not found" });
    }

    res.status(200).json(existingUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.delete_One_instructor = async (req, res) => {
  const instructorId = req.params.instructorId;

  try {
    // check for user
    const existingUser = await Instructor.findOne({ _id: instructorId });

    if (!existingUser) {
      return res.status(404).json({ status: "Instructor not found" });
    }
    // delete one user
    await Instructor.findByIdAndDelete({ _id: instructorId });

    res.status(200).json({ status: "Instructor deleted success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.update_instructor = async (req, res) => {
  const instructorId = req.params.instructorId;
  const updatedInstructorData = req.body;

  try {
    // check for user
    const existingUser = await Instructor.findOne({ _id: instructorId });

    if (!existingUser) {
      return res.status(404).json({ status: "Instructor not found" });
    }

    // update user ifo and return updated user
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorId,
      { $set: updatedInstructorData },
      {
        new: true,
        projection: {
          password: 0,
        },
      }
    );

    res.status(200).json(updatedInstructor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
