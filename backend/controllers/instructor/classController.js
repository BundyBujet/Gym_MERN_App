const GymClass = require("../../models/Classes");

module.exports.create_gym_class = async (req, res) => {
  const { name, instructor, description, schedule, capacity, enrolledMembers } =
    req.body;
  try {
    const gymClass = await GymClass.create({
      name,
      instructor,
      description,
      schedule,
      capacity,
      enrolledMembers,
    });

    if (!gymClass) {
      res.status(404).json({ status: "Class not Found" });
    }

    res.status(200).json(gymClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.update_gym_class = async (req, res) => {
  const classId = req.params.classId;
  const updatedClassData = req.body;
  try {
    const existingClass = await GymClass.findById({ _id: classId });
    if (!existingClass) {
      res.status(404).json({ status: "Class not Found" });
    }

    const updatedClass = await GymClass.findByIdAndUpdate(
      { _id: classId },
      { $set: updatedClassData },
      {
        new: true,
      }
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ statsu: "Can't access DB" });
  }
};

module.exports.get_one_gym_class = async (req, res) => {
  const classId = req.params.classId;

  try {
    const existingClass = await GymClass.findById({ _id: classId });
    if (!existingClass) {
      res.status(404).json({ status: "Class not Found" });
    }

    res.status(200).json(existingClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.get_all_gym_class = async (req, res) => {
  try {
    const allClasses = await GymClass.find().populate("instructor");
    if (!allClasses) {
      res.status(404).json({ status: "Class not Found" });
    }

    res.status(200).json(allClasses);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.delete_one_gym_class = async (req, res) => {
  const classId = req.params.classId;

  try {
    // check for user
    const existingClass = await GymClass.findOne({ _id: classId });

    if (!existingClass) {
      return res.status(404).json({ status: "Class not found" });
    }
    // delete one user
    await GymClass.findByIdAndDelete({ _id: classId });

    res.status(200).json({ status: "Class deleted success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
