const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);


// UPLOAD IMAGE
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded. Use form-data with key 'image'.",
        });
      }

      console.log(req.file);

      res.json({
        imageUrl: req.file.path || req.file.secure_url
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;
