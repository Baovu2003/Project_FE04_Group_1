const Cart = require("../../models/cart.model");

module.exports.getCartByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Return the cart data
    res.status(200).json({ success: true, cartItems: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  console.log({ userId });
  console.log({ productId, quantity });

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ user_id: userId, products: [] });
    }

    console.log("Current Cart:", cart);

    const existingProductIndex = cart.products.findIndex(
      (product) => product.product_id === productId
    );

    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += quantity;
      console.log(
        `Updated product quantity for product ID ${productId}:`,
        cart.products[existingProductIndex].quantity
      );
    } else {
      cart.products.push({ product_id: productId, quantity: quantity });
      console.log(`Added new product to cart:`, {
        product_id: productId,
        quantity: quantity,
      });
    }

    await cart.save();

    console.log("Updated Cart after changes:", cart);

    // Respond with the updated cart
    res.status(200).json({ message: true, cartItems: cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: false, message: "Server error" });
  }
};
module.exports.updateProductQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body; // The new quantity entered by the user

  console.log({ userId, productId, quantity });
  try {
    // Validate that the quantity is a positive number
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.product_id === productId
    );

    if (productIndex > -1) {
      // Update the quantity of the product
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({ success: true, cartItems: cart });
    }

    return res
      .status(404)
      .json({ success: false, message: "Product not found in cart" });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Tăng số lượng sản phẩm
module.exports.increaseQuantity = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product_id === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
      await cart.save();
      return res.status(200).json({ message: true, cartItems: cart });
    }

    return res.status(404).json({ message: "Product not found in cart" });
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).json({ message: false, message: "Server error" });
  }
};

// Giảm số lượng sản phẩm
module.exports.decreaseQuantity = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.product_id === productId
    );

    if (productIndex > -1) {
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
        await cart.save();
        return res.status(200).json({ message: true, cartItems: cart });
      } else {
        return res.status(400).json({ message: "Cannot decrease below 1" });
      }
    }

    return res.status(404).json({ message: "Product not found in cart" });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Xóa một sản phẩm khỏi giỏ hàng
module.exports.removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const newProductList = cart.products.filter(
      (product) => product.product_id !== productId
    );

    cart.products = newProductList;

    await cart.save();
    res.status(200).json({ message: true, cartItems: cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Xóa tất cả sản phẩm khỏi giỏ hàng
module.exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];

    await cart.save();
    res.status(200).json({ message: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
