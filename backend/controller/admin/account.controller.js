const md5 = require('md5');
const Account = require("../../models/account.model")

module.exports.index = async (req,res) =>{
    const records = await Account.find();
    res.json({
        recordsAccount: records
    })
}

module.exports.createPost = async (req, res) => {
    console.log(req.body)
    console.log(req.file); 
    req.body.password = md5(req.body.password )
    try {
      const record = new Account(req.body);
      await record.save();
      res.status(201).json({ message: "Account created successfully", record });
    } catch (error) {
      res.status(500).json({ message: "Error creating role", error });
    }
  };