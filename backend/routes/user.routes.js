const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddelware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid E-mail"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 Characters long"),
    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at Least 6 Characters long"),
  ],
  userController.registerUser,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid E-mail"),
    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must be at Least 6 Characters long"),
  ],
  userController.loginUser,
);

router.get("/profile", authMiddelware.authUser, userController.getUserProfile);
router.get("/logout", authMiddelware.authUser, userController.logoutUser);

module.exports = router;
