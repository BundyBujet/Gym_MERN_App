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

    res.status(200).json(gymClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
