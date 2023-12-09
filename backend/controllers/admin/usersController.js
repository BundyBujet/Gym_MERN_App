const User = require("../../models/Users");

module.exports.get_All_users = async (req, res) => {
  try {
    // query all users in the Database
    const allUsers = await User.find();

    if (allUsers) {
      res.status(200).json(allUsers);
    } else {
      res.status(200).json({ status: "No Users In DB" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.delete_One_user = async (req, res) => {
  const userId = req.params.userId;

  try {
    // check for user
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ status: "User not found" });
    }
    // delete one user
    await User.findByIdAndDelete({ _id: userId });

    res.status(200).json({ status: "User deleted success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};

module.exports.update_user = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    // check for user
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ status: "User not found" });
    }

    // update user ifo and return updated user
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Can't access DB" });
  }
};
