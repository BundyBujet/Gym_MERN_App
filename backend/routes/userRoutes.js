const classController = require("../controllers/user/classController");
const { authorizeUser } = require("../middleware/authMiddleware");
const { Router } = require("express");

const router = Router();

router.get(
  "/api/availableClass",
  authorizeUser,
  classController.get_available_classes
);

router.get("/api/joinClass", authorizeUser, classController.get_join_classes);

router.post("/api/joinClass", authorizeUser, classController.join_class);
router.delete(
  "/api/joinClass/:classId",
  authorizeUser,
  classController.leave_class
);

module.exports = router;
