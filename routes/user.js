const express = require("express");
const userRouter = express.Router();
const users = require("../model/user.js");
const mongoose = require("mongoose");
const user = require("../model/user.js");
const nodemailer = require("nodemailer");
var options = {
  native_parser: true,
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const url = "mongodb://localhost:27017/mydb";

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "***username***",
    pass: "******",
  },
});

userRouter.post("/add-user", async (req, res) => {
  const { name, email, profile_image, address } = req.body;
  console.log("reg", req.body);
  mongoose.connect(url, options);
  const usr = new users({ name, email, profile_image, address });

  await usr
    .save()
    .then((users) => {
      const message = {
        from: "Sender@gmail.com", // Sender address
        to: "recipients@gmail.com", // List of recipients
        subject: "Design Your Model S | Tesla", // Subject line
        text: "Have the most fun you can in a car. Get your Tesla today!", // Plain text body
      };
      transport.sendMail(message, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          res.json(users);
        }
      });
      console.log("vvv", users);
      // res.json(users);
    })
    .catch((error) =>
      res.status(409).json({
        success: false,
        message: "Given users email already exist",
        error: error.message,
      })
    );
});

userRouter.get("/list-users", async (req, res) => {
  mongoose.connect(url, options);
  console.log("usrlist");
  try {
    const usrlist = await user.find({}, { __v: 0 });
    console.log("usrlist");
    res.status(200).json({
      success: true,
      statusCode: "201",
      message: usrlist,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "unable to fetch",
      error: error.message,
    });
  }
});

module.exports = userRouter;
