const md5 = require("md5");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const user = await User.find({
    deleted: false,
  });
  res.json({
    user: user,
  });
};
module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body);
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  console.log(existEmail);
  if (existEmail) {
    res.status(500).json({
      message: "Email exist",
    });
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.status(200).json({
    message: "Register successful",
  });
};

module.exports.loginPost = async (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  const user = await User.findOne({
    email: req.body.email,
    // deleted: false,
  });
  console.log(user);
  if (!user) {
    res.status(500).json({
      message: "Email not exist",
    });
    return;
  }

  console.log(md5(req.body.password))
  console.log(user.password)
  if (md5(req.body.password) !== user.password) {
    {
      res.status(500).json({
        message: "Password is not correct",
      });
      return;
    }
  }
  if (!user.status == "active") {
    {
      res.status(500).json({
        message: "Tài khoản đã bị khóa",
      });
      return;
    }
  }

  
  console.log(user);
  console.log(user.tokenUser);
  res.cookie("token", user.tokenUser);
  res.status(200).json({
    message: "Register successful",
    tokenUser: user.tokenUser,
    user: user,
  });
};

module.exports.verifyTokenByToken = async (req, res) => {
  const tokenUser = req.params.tokenUser; // Extract token from the route parameter

  console.log(tokenUser)
  if (!tokenUser) {
    return res.status(401).json({ valid: false, message: "No token provided." });
  }
  try {
    const user = await User.findOne({ tokenUser:tokenUser });

    // Optionally return user information if needed
    return res.status(200).json({ valid: true, user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ valid: false, message: "Login fail" });
  }
};