const { Router } = require("express");
const { authorizeAdmin } = require("../middleware/authMiddleware");
const userController = require("../controllers/admin/usersController");
const profileController = require("../controllers/admin/profileController");
const classController = require("../controllers/admin/classController");

const router = Router();

router.get("/api/admin/getUsers", authorizeAdmin, userController.get_All_users);

router.get(
  "/api/admin/user/:userId",
  authorizeAdmin,
  userController.get_One_user
);

router.delete(
  "/api/admin/user/:userId",
  authorizeAdmin,
  userController.delete_One_user
);
router.put(
  "/api/admin/user/:userId",
  authorizeAdmin,
  userController.update_user
);
router.get("/api/admin/profile", authorizeAdmin, profileController.get_profile);

// create a Gym's Class
router.post(
  "/api/admin/gymClass",
  authorizeAdmin,
  classController.create_gym_class
);

module.exports = router;
