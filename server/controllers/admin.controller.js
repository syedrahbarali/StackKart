const Product = require("../models/product.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");


const dashboardData = async (req, res) => {
  try {
    // 1. Total counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    // 2. Total Sales (sum of order items)
    const orders = await Order.aggregate([
      { $match: { paymentStatus: "Success" } },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $multiply: ["$items.quantity", "$productDetails.price"] } },
        },
      },
    ]);
    const totalSales = orders.length > 0 ? orders[0].totalSales : 0;

    // 3. Monthly Sales (last 6 months)
    const monthlySalesRaw = await Order.aggregate([
      { $match: { paymentStatus: "Success" } },
      {
        $group: {
          _id: { $month: "$orderedAt" },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } }
    ]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesData = {
      labels: monthNames,
      datasets: [{
        label: 'Sales (₹)',
        data: monthNames.map((_, idx) => {
          const month = monthlySalesRaw.find(m => m._id === idx + 1);
          return month ? month.total : 0;
        }),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      }],
    };

    // 4. Category distribution
    const categoryRaw = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    const categoryDistribution = {
      labels: categoryRaw.map(c => c._id),
      datasets: [{
        data: categoryRaw.map(c => c.count),
        backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'],
        borderWidth: 1,
      }],
    };

    // Final response
    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalSales,
      salesData,
      categoryDistribution
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { dashboardData };