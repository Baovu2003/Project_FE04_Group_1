const md5 = require("md5");
const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log({ email, password });

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  console.log("user", user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If the user exists, you can check the password and proceed with login logic
  const hashedPassword = md5(password); // Assuming you're hashing the password with md5
  console.log(hashedPassword);
  console.log(md5(password));
  console.log(user.password);
  if (user.password !== hashedPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  if (user.status == "inactive") {
    return res.status(401).json({ message: "Tài Khoản đã bị khoá" });
  }

  // Continue with login process (e.g., generating JWT token, session, etc.)
  console.log(user.token);
  res.cookie("token", user.token);
  const role = await Role.findOne({
    _id: user.role_id,
  }).select("title permission");
  res.status(200).json({ message: "Login successful", token: user.token, user: user, role:role });
};


module.exports.verifyToken = async (req, res) => {

  const token = req.headers.authorization

  console.log(token)
  if (!token) {
    return res
      .status(401)
      .json({ valid: false, message: "No token provided." });
  }

  try {
    const user = await Account.findOne({ token });

    if (!user) {
      return res.status(401).json({ valid: false, message: "Invalid token." });
    }

    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(500)
      .json({ valid: false, message: "Internal server error." });
  }
};

module.exports.verifyTokenByToken = async (req, res) => {
  const token = req.params.token; // Extract token from the route parameter

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided." });
  }

  try {
    const user = await Account.findOne({ token });

    const role = await Role.findOne({
      _id: user.role_id,
    }).select("title permission");
    if (!user) {
      return res.status(401).json({ valid: false, message: "Invalid token." });
    }

    // Optionally return user information if needed
    return res.status(200).json({ valid: true, user,role });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ valid: false, message: "Internal server error." });
  }
};
