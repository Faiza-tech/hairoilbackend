const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 100,
    },

    totalSold: {
      type: Number,
      default: 0,
    },

    features: {
      type: [String],
      default: [],
    },

    // ⭐ AVERAGE RATING 
    ratings: {
      type: Number,
      default: 0,
    },

    // ⭐ TOTAL REVIEWS COUNT 
    numReviews: {
      type: Number,
      default: 0,
    },

    // ⭐ REVIEWS ARRAY 
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: {
          type: String,
          required: true,
        },

        rating: {
          type: Number,
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },
      }
    ]

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);