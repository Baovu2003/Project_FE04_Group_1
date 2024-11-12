const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // B24 phút 44 trở đi
    timestamps: true,
  }
);
// Tham số thứ 3 trongt phần này là tên của collection trong database product-management
const Cart = mongoose.model("Chat", chatSchema, "chats");
module.exports = Cart;
