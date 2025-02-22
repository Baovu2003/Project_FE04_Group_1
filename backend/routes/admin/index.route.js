const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const rolesRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route")

const authMiddleware = require("../../middlewares/admin/auth.middleware")
const systemConfig = require("../../config/system")
module.exports = (app) => {

  const PATH_ADMIN =systemConfig.prefixAdmin;
  app.use(PATH_ADMIN+"/dashboard",authMiddleware.requireAuth, dashboardRoutes);
  app.use(PATH_ADMIN+"/products-category", authMiddleware.requireAuth,productCategoryRoutes);
  app.use(PATH_ADMIN+"/products", authMiddleware.requireAuth,productRoutes);
  app.use(PATH_ADMIN+"/roles", authMiddleware.requireAuth,rolesRoutes);
  app.use(PATH_ADMIN+"/accounts", authMiddleware.requireAuth,accountRoutes);
  app.use(PATH_ADMIN+"/auth", authRoutes);
};
