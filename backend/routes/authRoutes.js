const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/api/signup", authController.signup_post);
router.post("/api/login", authController.login_post);
router.get("/api/logout", authController.logout_get);

module.exports = router;
