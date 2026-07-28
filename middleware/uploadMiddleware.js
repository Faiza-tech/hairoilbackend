const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require(
  "../config/cloudinary"
);

// CLOUDINARY STORAGE
const storage = new CloudinaryStorage({

  cloudinary,

  params: {

    folder: "hair-products",

    allowed_formats: [
      "jpg",
      "png",
      "jpeg",
      "webp",
    ],

  },

});

// MULTER UPLOAD
const upload = multer({
  storage,
});

module.exports = upload;