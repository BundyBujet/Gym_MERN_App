const { Router } = require("express");
const { authorizeAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/admin/usersController");

const router = Router();

router.get(
  "/api/admin/getUsers",
  authorizeAdmin,
  adminController.get_All_users
);

router.delete(
  "/api/admin/user/:userId",
  authorizeAdmin,
  adminController.delete_One_user
);
router.put(
  "/api/admin/user/:userId",
  authorizeAdmin,
  adminController.update_user
);

module.exports = router;
