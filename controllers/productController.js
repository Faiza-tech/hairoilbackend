const Product = require("../models/productModel");


// GET all products
const getProducts = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;

    const limit = 10;

    // SEARCH
    const keyword = req.query.keyword
      ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
      : {};

    // CATEGORY
    const category =
      req.query.category &&
        req.query.category !== "all"
        ? { category: req.query.category }
        : {};

    // PRICE FILTER
    let priceFilter = {};

    if (req.query.price === "low") {
      priceFilter = {
        price: { $lt: 200 },
      };
    }

    if (req.query.price === "mid") {
      priceFilter = {
        price: {
          $gte: 200,
          $lte: 400,
        },
      };
    }

    if (req.query.price === "high") {
      priceFilter = {
        price: { $gt: 400 },
      };
    }

    // FINAL FILTER
    const filter = {
      ...keyword,
      ...category,
      ...priceFilter,
    };

    // SORTING
    let sort = {};

    if (req.query.sort === "price-low") {
      sort = { price: 1 };
    }

    if (req.query.sort === "price-high") {
      sort = { price: -1 };
    }

    if (req.query.sort === "name-az") {
      sort = { title: 1 };
    }

    if (req.query.sort === "name-za") {
      sort = { title: -1 };
    }

    // TOTAL PRODUCTS
    const count = await Product.countDocuments(filter);

    // PRODUCTS
    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);

    // RESPONSE
    res.json({
      products,
      page,
      pages: Math.ceil(count / limit),
      totalProducts: count,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET single product
const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// CREATE product
const createProduct = async (req, res) => {

  try {
    console.log(req.body)

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE product
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product removed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// UPDATE product
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.title =
      req.body.title || product.title;

    product.image =
      req.body.image || product.image;

    product.description =
      req.body.description || product.description;

    product.price =
      req.body.price !== undefined
        ? req.body.price
        : product.price;

    product.category =
      req.body.category || product.category;

    product.stock =
      req.body.stock !== undefined
        ? req.body.stock
        : product.stock;

    product.features =
      req.body.features || product.features;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



const createProductReview = async (req, res) => {

  try {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // CHECK IF USER ALREADY REVIEWED
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Product already reviewed",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    // CALCULATE AVG RATING
    product.ratings =
      product.reviews.reduce(
        (acc, item) => item.rating + acc,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELETE REVIEW
const deleteReview = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // FIND REVIEW
    const review = product.reviews.find(
      (r) =>
        r._id.toString() === req.params.reviewId
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }
    /*
        // ALLOW ONLY OWNER
        if (
          review.user.toString() !==
          req.user._id.toString()
        ) {
          return res.status(401).json({
            message: "Not authorized",
          });
        }*/

    // Allow review owner OR admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "You don't have permission to modify this review",
      });
    }


    // REMOVE REVIEW
    product.reviews = product.reviews.filter(
      (r) =>
        r._id.toString() !== req.params.reviewId
    );

    // UPDATE COUNTS
    product.numReviews =
      product.reviews.length;

    // RECALCULATE RATING
    product.ratings =
      product.reviews.length === 0
        ? 0
        : product.reviews.reduce(
          (acc, item) =>
            item.rating + acc,
          0
        ) / product.reviews.length;

    await product.save();

    res.json({
      message: "Review removed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




const updateReview = async (req, res) => {

  try {

    const { rating, comment } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    const review = product.reviews.find(
      (r) =>
        r._id.toString() ===
        req.params.reviewId
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }


    /*
        // OWNER ONLY
        if (
          review.user.toString() !==
          req.user._id.toString()
        ) {
          return res.status(401).json({
            message: "Not authorized",
          });
        }
        */

    // Allow review owner OR admin
    if (
      review.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "You don't have permission to modify this review",
      });
    }



    review.rating = rating;
    review.comment = comment;

    // RECALCULATE
    product.ratings =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.json({
      message: "Review updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};





module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  deleteReview,
  updateReview,
};