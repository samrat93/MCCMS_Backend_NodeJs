const nodemailer = require("nodemailer");
const emailsend = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mechetanshah@gmail.com",
      pass: "nepal@123#",
    },
  });

  var mailOptions = {
    from: "mechetanshah@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `<h1>Your otp is : ${otp}</h1>
      <h3>otp is valid only 5 minute</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send : ", info.response);
    }
  });
};

module.exports = { emailsend };
