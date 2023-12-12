const GymClass = require("../../models/Classes");

module.exports.get_available_classes = async (req, res) => {
  try {
    const existingClass = await GymClass.find(
      { isFull: false },
      { schedule: 1, name: 1, instructor: 1, description: 1 }
    );

    if (!existingClass) {
      res.status(404).json({ status: "Class not found" });
    }

    res.status(200).json(existingClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.join_class = async (req, res) => {
  const { classId } = req.body;
  const userId = req.userInfo.id;
  try {
    const existingClass = await GymClass.findById({ _id: classId });

    if (!existingClass) {
      res.status(404).json({ status: "Class not found" });
    }

    if (!existingClass.isFull) {
      const enrolledUsers = existingClass.enrolledMembers;

      if (enrolledUsers.includes(userId)) {
        return res.status(200).json({ status: "user already exist" });
      } else {
        enrolledUsers.push(userId);
        const update = {
          enrolledMembers: enrolledUsers,
        };
        console.log(update);
        const updatedClass = await GymClass.findOneAndUpdate(
          { _id: classId },
          { $set: update },
          { new: true }
        );

        return res.status(200).json(updatedClass);
      }
    }

    res.status(200).json(existingClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
