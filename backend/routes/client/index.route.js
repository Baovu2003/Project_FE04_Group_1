const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");
module.exports = (app) => {
  // app.use(cartMiddleware.cartId);
  app.use("/", cartMiddleware.cartId, homeRoutes);
  app.use("/products", cartMiddleware.cartId, productRoutes);
  app.use("/cart", cartMiddleware.cartId, cartRoutes);
  app.use("/checkout", cartMiddleware.cartId, checkoutRoutes);
  app.use("/user", userRoutes);
};
