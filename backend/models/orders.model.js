
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id:String,
    cart_id: String,
    userInfo: [
      {
        fullname: String,
        phone: String,
        address: String
      },
    ],
      products: [
        {
            product_id: String,
            quantity: Number,
            price: Number,
            discountPercentage: Number
        }
      ]
    
  },
  {
    // B24 phút 44 trở đi
    timestamps: true,
  }
);
// Tham số thứ 3 trongt phần này là tên của collection trong database product-management
const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
