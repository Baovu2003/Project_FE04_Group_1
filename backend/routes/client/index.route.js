const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
module.exports = (app) => {
  app.use("/", homeRoutes);

  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/user", userRoutes);
};
