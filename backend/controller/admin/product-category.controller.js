const ProductCategory = require("../../models/product-category.model");
const systemconfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
  const records = await ProductCategory.find();
  // console.log(records);

  // const newRecords = createTreeHelper.tree(records);
  const newRecords = createTreeHelper.tree(
    records.map((record) => record.toObject({ virtuals: true }))
  );

  console.log(newRecords);
  res.json({
    records: newRecords,
  });
};

module.exports.createUsePost = async (req, res) => {
  console.log(res.locals.role.permission);
  const permission = res.locals.role.permission;
  if (permission.includes("products-category_create")) {
    // Cài đặt vị trí nếu chưa được cung cấp
    if (req.body.position === "") {
      const x = await ProductCategory.countDocuments();
      req.body.position = x + 1; // Tự động tăng vị trí
    } else {
      req.body.position = Number(req.body.position);
    }

    // Xử lý thumbnail
    if (req.file) {
      // Đường dẫn đến file đã upload
      req.body.thumbnail = `/uploads/${req.file.filename}`; // Lưu trữ đường dẫn vào req.body
    }

    // Tạo danh mục
    // const category = new ProductCategory(req.body);
    // console.log(category);

    // await category.save();
    req.flash("success", "Create products successfully");
    res.redirect(`${systemconfig.prefixAdmin}/products-category`);
  } else {
    res.json({
      message: "Error"
    })
    return 
  }
};

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    const result = await ProductCategory.updateOne(
      { _id: id },
      { status: status }
    );

    // Check if any documents were modified
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or status unchanged." });
    }

    // Optionally, you can fetch the updated product to send back to the frontend
    const updatedProduct = await ProductCategory.findById(id);

    res.json({
      message: "Cập nhật trạng thái thành công!",
      records: updatedProduct, // Send the updated product details
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật trạng thái." });
  }
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    const product = await ProductCategory.findOne(find).exec();
    console.log("productById: ", product);

    const records = await ProductCategory.find({
      deleted: false,
    });

    const newRecords = createTreeHelper.tree(
      records.map((record) => record.toObject({ virtuals: true }))
    );
    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: "Edit danh mục sản phẩm",
      product: product,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemconfig.prefixAdmin}/products-category`);
  }
};

module.exports.editUsePost = async (req, res) => {
  console.log("req.body:", req.body);

  if (req.body.position == "") {
    const x = await ProductCategory.countDocuments();
    // console.log(x)
    req.body.position = x + 1;
  } else {
    req.body.position = Number(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await ProductCategory.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", `Update products-category successfully `);
  } catch (error) {
    res.redirect("back");
  }

  res.redirect(`${systemconfig.prefixAdmin}/products-category`);
};

module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    // const product = await Product.findById(id).exec();
    const product = await ProductCategory.findOne(find).exec();
    console.log("productById: ", product);
    //  res.send("ok")
    res.render("admin/pages/products-category/detail.pug", {
      pageTitle: "Detail sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemconfig.prefixAdmin}/products-category`);
  }
};

module.exports.deleteItem = async (req, res) => {
  // console.log("req.params", req.params);
  const id = req.params.id;
  console.log("id: ", id);

  // -----------Xoá vĩnh viễn------------
  // await Product.deleteOne({ _id: id }, { deleted: "true" });

  // ----------Xoá mềm---------------
  // await Product.updateOne(
  //   { _id: id },
  //   {
  //     deleted: !(Product.deleted),
  //     deleteAt: new Date(),
  //   }
  // );
  // req.flash("success", `Update products successfully `);
  // res.redirect("back");

  try {
    // Tìm sản phẩm trước để lấy trạng thái hiện tại
    const product = await ProductCategory.findById(id);

    console.log(product.deleted);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("back");
    }

    // Cập nhật trạng thái deleted và deleteAt
    await ProductCategory.updateOne(
      { _id: id },
      {
        deleted: !product.deleted, // Đảo trạng thái deleted
        deleteAt: new Date(), // Cập nhật thời gian xóa
      }
    );

    res.json({
      message: "Deleted sản phẩm thành công!",
      records: product, // Send the updated product details
    });
  } catch (error) {
    console.error("Error updating deleted:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi deleted trạng thái." });
  }
};
