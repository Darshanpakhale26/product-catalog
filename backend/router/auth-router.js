const express = require("express");
const router = express.Router(); // Router is a middleware in express
const authControllers = require("../controllers/auth-controller"); // Importing the controller functions from auth-controller.js
const { signupSchema, loginSchema } = require("../validators/auth-validator"); // Importing the schema from auth-validator.js
const validate = require("../middlewares/validate-middleware"); // Importing the validate middleware from validate-middleware.js

// Defining the routes for the router
router.route("/").get(authControllers.home);

router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

module.exports = router; // Exporting the router to use in server.js
