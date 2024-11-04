const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const generateNumber = require("../../helpers/generateToken");
const sendMailHelper = require("../../helpers/sendMail");
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
  const existPhone = await User.findOne({
    phone: req.body.phone,
    deleted: false,
  });
  if (existPhone) {
    res.status(500).json({
      message: "Phone exist",
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

  console.log(md5(req.body.password));
  console.log(user.password);
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
    message: "Login successful",
    tokenUser: user.tokenUser,
    user: user,
  });
};

module.exports.forgotpassword = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  console.log(user);
  if (!user) {
    res.status(500).json({
      message: "Email not exist",
    });
    return;
  }
  // Thứ 1: Nếu có user tạo mã OTP và lưu thông tin yêu cầu vào collection
  const otpRender = generateNumber.generateNumber(6);

  const objectFortgotPassword = {
    email: req.body.email,
    otp: otpRender,
    expireAt: Date.now() + 1 * 60 * 1000,
  };
  console.log(objectFortgotPassword);

  //   const readableExpireAt = new Date(objectFortgotPassword.expireAt).toLocaleString();

  // console.log({
  //   ...objectFortgotPassword,
  //   expireAt: readableExpireAt,
  // });

  const forgotPassword = new ForgotPassword(objectFortgotPassword);
  forgotPassword.save();

  // Thứ 2:Gửi mã otp qua email cho user
  const subject = "Mã OPT của bạn";
  const html=`
    Mã OPT xác minh của bạn:<b> ${otpRender}</b>. Lưu ý bảo mật mã OTP. Thời hạn là 3p
  `
  sendMailHelper.sendMail(req.body.email,subject,html);

  res.status(200).json({
    message: "Send email successful",
    detailUser: user,
  });
};

module.exports.OTPPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  console.log({
    email,
    otp,
  });
  const result = await ForgotPassword.findOne({
    email,
    otp,
  });
  if (result) {
    const user = await User.findOne({
      email: email,
    });
    console.log(user.tokenUser);
    res.status(200).json({
      message: "OTP verified successfully",
      tokenUser: user.tokenUser,
    });
  } else {
    res.status(500).json({
      message: "OTP verified failed",
    });
  }
};
module.exports.resetPassword = async (req, res) => {
  console.log(req.body);
  await User.updateOne(
    {
      tokenUser: req.body.tokenUser,
    },
    {
      password: md5(req.body.password),
    }
  );
  res.status(200).json({
    message: "Change password successful",
  });
};

module.exports.verifyTokenByToken = async (req, res) => {
  const tokenUser = req.params.tokenUser; // Extract token from the route parameter

  console.log(tokenUser);
  if (!tokenUser) {
    return res
      .status(401)
      .json({ valid: false, message: "No token provided." });
  }
  try {
    const user = await User.findOne({ tokenUser: tokenUser });

    // Optionally return user information if needed
    return res.status(200).json({ valid: true, user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ valid: false, message: "Login fail" });
  }
};
