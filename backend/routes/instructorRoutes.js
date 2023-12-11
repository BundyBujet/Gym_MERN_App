const { Router } = require("express");
const { authorizeInstructor } = require("../middleware/authMiddleware");
const classController = require("../controllers/instructor/classController");

const router = Router();

// Gym's Class
router.post(
  "/api/gymClass",
  authorizeInstructor,
  classController.create_gym_class
);

router.put(
  "/api/gymClass/:classId",
  authorizeInstructor,
  classController.update_gym_class
);

router.get(
  "/api/gymClass/:classId",
  authorizeInstructor,
  classController.get_one_gym_class
);

router.get(
  "/api/gymClass",
  authorizeInstructor,
  classController.get_all_gym_class
);

router.delete(
  "/api/gymClass/:classId",
  authorizeInstructor,
  classController.delete_one_gym_class
);

module.exports = router;
