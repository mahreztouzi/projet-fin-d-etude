const express = require("express");
const coursController = require("../controllers/cours.controller");
const coursUploader = require("../helpers/cours-uploader");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post(
  "/",
  checkAuth.checkAuth,
  coursUploader.upload.single("pdf"),
  coursController.createCours
);

router.delete("/:id", checkAuth.checkAuth, coursController.deleteCours);
router.patch(
  "/:id",
  checkAuth.checkAuth,
  coursController.TestUploadUpdate,
  coursUploader.upload.single("pdf"),
  coursController.updateCours
);

router.get("/", checkAuth.checkAuth, coursController.getAllCours);

module.exports = router;
