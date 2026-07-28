const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Product = require("./models/Product");

const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {

  try {

    // delete old products
    await Product.deleteMany();

    // insert new products
    await Product.insertMany(products);

    console.log("Products Imported!");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
};

importData();