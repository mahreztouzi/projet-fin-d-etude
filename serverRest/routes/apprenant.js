const express = require("express");
const router = express.Router();
const apprenantController = require("../controllers/apprenant.controller");

router.post("/signUp", apprenantController.signUp);
router.post("/", apprenantController.login);
module.exports = router;
