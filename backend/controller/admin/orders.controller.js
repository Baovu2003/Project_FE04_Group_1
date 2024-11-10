const Order = require("../../models/orders.model");
module.exports.index = async (req, res) => {
  try {
    const allOrder = await Order.find({});
    console.log(allOrder);
    res.json(allOrder); // Gửi kết quả về client (nếu cần)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
};


