const { Router } = require("express");
const { authorizeAdmin } = require("../middleware/authMiddleware");
const userController = require("../controllers/admin/usersController");
const profileController = require("../controllers/admin/profileController");
const classController = require("../controllers/admin/classController");
const equipmentController = require("../controllers/admin/equipmentController");
const instructorsController = require("../controllers/admin/instructorController");

const router = Router();
// user controlled Routes
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

// Profile routes
router.get("/api/admin/profile", authorizeAdmin, profileController.get_profile);

router.put(
  "/api/admin/profile",
  authorizeAdmin,
  profileController.update_profile
);

// Gym's Class
router.post(
  "/api/admin/gymClass",
  authorizeAdmin,
  classController.create_gym_class
);

router.put(
  "/api/admin/gymClass/:classId",
  authorizeAdmin,
  classController.update_gym_class
);

router.get(
  "/api/admin/gymClass/:classId",
  authorizeAdmin,
  classController.get_one_gym_class
);

router.get(
  "/api/admin/gymClass",
  authorizeAdmin,
  classController.get_all_gym_class
);

router.delete(
  "/api/admin/gymClass/:classId",
  authorizeAdmin,
  classController.delete_one_gym_class
);

// equipments Routes

router.get(
  "/api/admin/equipment",
  authorizeAdmin,
  equipmentController.get_all_equipments
);
router.get(
  "/api/admin/equipment/:equipmentId",
  authorizeAdmin,
  equipmentController.get_one_equipment
);
router.post(
  "/api/admin/equipment",
  authorizeAdmin,
  equipmentController.create_equipment
);
router.put(
  "/api/admin/equipment/:equipmentId",
  authorizeAdmin,
  equipmentController.update_equipments
);
router.delete(
  "/api/admin/equipment/:equipmentId",
  authorizeAdmin,
  equipmentController.delete_equipments
);

// instructors
router.get(
  "/api/admin/getInstructors",
  authorizeAdmin,
  instructorsController.get_All_instructors
);

router.get(
  "/api/admin/instructor/:instructorId",
  authorizeAdmin,
  instructorsController.get_One_instructor
);

router.delete(
  "/api/admin/instructor/:instructorId",
  authorizeAdmin,
  instructorsController.delete_One_instructor
);
router.put(
  "/api/admin/instructor/:instructorId",
  authorizeAdmin,
  instructorsController.update_instructor
);

module.exports = router;
