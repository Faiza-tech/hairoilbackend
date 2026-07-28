
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const getDashboardStats = async (req, res) => {

  try {

    // TOTAL PRODUCTS
    const totalProducts =
      await Product.countDocuments();

    // TOTAL USERS
    const totalUsers =
      await User.countDocuments();

    // TOTAL ORDERS
    const totalOrders =
      await Order.countDocuments();

    // ALL ORDERS
    const orders = await Order.find();

    // TOTAL REVENUE
    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );



    // LOW STOCK PRODUCTS
    const lowStockProducts =
      await Product.find({
        stock: { $lt: 20 },
      }).select("title stock totalSold")




    // MONTHLY SALES

    const monthlySales = Array(12)
      .fill(0)
      .map((_, index) => ({
        month: new Date(
          0,
          index
        ).toLocaleString("default", {
          month: "short",
        }),
        revenue: 0,
      }));

    orders.forEach((order) => {

      const month =
        new Date(order.createdAt).getMonth();

      monthlySales[month].revenue +=
        order.totalPrice;

    });

    //inventory summary
    const inventorySummary = await Product.aggregate([
      {
        $group: {
          _id: null,

          totalInventory: {
            $sum: "$stock"
          },

          totalSold: {
            $sum: "$totalSold"
          }
        }
      }
    ]);


    const allProducts = await Product.find();

    allProducts.forEach((product) => {
      console.log(
        product.title,
        "Stock:",
        product.stock,
        "Sold:",
        product.totalSold
      );
    });

    // Top Selling Product
    const topSellingProducts =
      await Product.find({})
        .sort({ totalSold: -1 })
        .limit(5)
        .select("title totalSold stock");


    //recent orders
    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);


    //Recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email");



    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const shippedOrders = await Order.countDocuments({
      status: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });



    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      lowStockProducts,

      inventorySummary:
        inventorySummary[0] || {
          totalInventory: 0,
          totalSold: 0
        },

      monthlySales,
      topSellingProducts,
      recentOrders,
      recentUsers,

      pendingOrders,
      shippedOrders,
      deliveredOrders
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,

    });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent self role change, prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {

      return res.status(400).json({

        message: "You cannot delete yourself",

      });
    }

    //check if this is last admin
    if (user.isAdmin) {

      const adminCount = await User.countDocuments({
        isAdmin: true,
      })

      if (adminCount === 1) {
        return res.status(400).json({
          message: "Cannot delete the last admin",
        })
      }
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



const toggleAdminRole = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent self role change
    if (user._id.toString() === req.user._id.toString()) {

      return res.status(400).json({
        message: "You cannot change your own admin role",
      });
    }


    // prevent removing last admin
    if (user.isAdmin) {

      const adminCount = await User.countDocuments({

        isAdmin: true,
      })

      if (adminCount === 1) {
        return res.status(400).json({
          message: " Cannot remove last admin",
        })
      }
    }



    user.isAdmin = !user.isAdmin;

    await user.save();

    res.json({
      message: "Role updated",
      isAdmin: user.isAdmin,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




module.exports = {
  getDashboardStats,
  getAllProductsAdmin,
  getUsers,
  deleteUser,
  toggleAdminRole,
};