const classController = require("../controllers/user/classController");
const { authorizeUser } = require("../middleware/authMiddleware");
const { Router } = require("express");

const router = Router();

router.get(
  "/api/availableClass",
  authorizeUser,
  classController.get_available_classes
);

router.post("/api/joinClass", authorizeUser, classController.join_class);

module.exports = router;
