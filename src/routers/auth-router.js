import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import { body } from "express-validator";

const router = new Router();

router.post(
  "/api/registration",
  body("email").isEmail().withMessage("Incorrect email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Min length of password is 5"),
  authController.registration
);
router.post("/api/login", authController.login);

export default router;
