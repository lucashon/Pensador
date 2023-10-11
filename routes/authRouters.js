const express = require("express");
const { authPlugins } = require("mysql2");
const router = express.Router();

// Controller
const AuthController = require("../controllers/AuthController");

router.get("/login", AuthController.login);
router.get("/register", AuthController.register);
router.post("/register", AuthController.registerPost);
router.get('/logout', AuthController.logout)

module.exports = router;
