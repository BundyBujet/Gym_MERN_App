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
