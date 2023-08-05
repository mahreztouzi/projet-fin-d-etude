const express = require("express");
const router = express.Router();
const enseignantController = require("../controllers/enseigant.controller");

router.post("/signUp", enseignantController.signUp);
router.post("/", enseignantController.login);
module.exports = router;
