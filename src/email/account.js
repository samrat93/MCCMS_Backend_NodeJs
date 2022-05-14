const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mechetanshah@gmail.com",
    pass: "nepal@123#",
  },
});

const emailsend = (email, otp) => {
  var mailOptions = {
    from: "mechetanshah@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    html: `<h1>Your otp is : ${otp}</h1>
      <h3>otp is valid only for 2 minutes</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send : ", info.response);
    }
  });
};

const sendFeedbackEmail = (email) => {
  var mailOptions = {
    from: "mechetanshah@gmail.com",
    to: email,
    subject: "Feedback mail",
    html: `<h2>Thankyou for your feedback  : ${email}</h2>
      <h3>we will consider your feedback to improve our system.</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send : ", info.response);
    }
  });
};

const verifyEmail = (email) => {
  var mailOptions = {
    from: "mechetanshah@gmail.com",
    to: email,
    subject: "Account Verification",
    html: `<h2>Your account is Verified : ${email}</h2>
      <h3>Now you can login to our system.</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send : ", info.response);
    }
  });
};

const registerEmail = (email) => {
  var mailOptions = {
    from: "mechetanshah@gmail.com",
    to: email,
    subject: "Registration",
    html: `<h2>Thankyou for the registration : ${email}</h2>
      <h3>We can verify your details and send you an confirmation email.
       After verification you can login to our system.</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send : ", info.response);
    }
  });
};

module.exports = { emailsend, sendFeedbackEmail, verifyEmail, registerEmail };
