const Blog = require("../../models/blog.model");


// module.exports.createBlog = async (req, res) => {
//     const{
//         title,
//         description,
//         thumbnail,
//         status,
//         position,
//         deleted}
//         = req.body;
//   try {
//     const blog = new Blog(req.body);
//   // console.log(product);

//   await blog.save();
//     res.json("success"); // Gửi kết quả về client (nếu cần)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving blog" });
//   }
// };

module.exports.createBlog = async (req, res) => {
   
    if (req.body.position === "") {
        const x = await Blog.countDocuments();
        req.body.position = x + 1; // Tự động tăng vị trí
      } else {
        req.body.position = Number(req.body.position);
      }
    
      // Xử lý thumbnail
    if (req.file) {
        // Đường dẫn đến file đã upload
        req.body.thumbnail = `/uploads/${req.file.filename}`; // Lưu trữ đường dẫn vào req.body
      }

  try {
    const blog = new Blog(req.body);
  // console.log(product);

  await blog.save();
    res.json("success"); // Gửi kết quả về client (nếu cần)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving blog" });
  }
};

module.exports.listBlog = async (req, res) => {
  try {
    const allBlog = await Blog.find({});
    res.json({
        recordBlog: allBlog
    }); // Gửi kết quả về client (nếu cần)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
};