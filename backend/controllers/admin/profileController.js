const Admin = require("../../models/Admin");

module.exports.get_profile = async (req, res) => {
  try {
    const adminProfile = await Admin.findById({ _id: req.userInfo.id });

    if (!adminProfile) {
      res.status(404).json({ status: "User Not found" });
    }

    res.status(200).json(adminProfile.profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.update_profile = async (req, res) => {
  const { id } = req.userInfo;
  const { profile } = req.body;
  console.log(profile);
  try {
    const existingUser = await Admin.findById({ _id: id });
    if (!existingUser) {
      res.status(402).json({ status: "User not found" });
    }
    const { firstName, lastName, age } = existingUser.profile;

    // construct the updated object
    const updateObject = {
      profile: {
        firstName: profile.firstName || firstName,
        lastName: profile.lastName || lastName,
        age: profile.age || age,
      },
    };
    console.log(updateObject);

    const updatedUser = await Admin.findByIdAndUpdate(
      { _id: id },
      updateObject,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
