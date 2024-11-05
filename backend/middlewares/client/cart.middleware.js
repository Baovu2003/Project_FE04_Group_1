const Cart = require("../../models/cart.model");
const User = require("../../models/user.model"); // Adjust this to your user model's path

module.exports.cartId = async (req, res, next) => {
  console.log("Cart middleware");

  console.log(req.cookies);
  const tokenUser = req.cookies.tokenUser;
  console.log("req.cookies.tokenUser", tokenUser);

  // If the tokenUser cookie does not exist, create a new cart
  if (!tokenUser) {
    // const cart = new Cart();
    // await cart.save();
    // console.log(cart);
  } else {
    try {
      const user = await User.findOne({ tokenUser: tokenUser });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Find or create a cart for the user
      let cart = await Cart.findOne({ user_id: user._id });
      if (!cart) {
        cart = new Cart({
          user_id: user._id,
          products: [], // Initialize with an empty products array
        });
        await cart.save();
      }

      console.log("Cart found or created:", cart);
      req.cart = cart; // Pass the cart to the next middleware or route handler
    } catch (error) {
      console.error("Error decoding tokenUser or finding user:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  next();
};
