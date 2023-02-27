const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  return transporter.sendMail({
    from: `E-Commerce Backend <${process.env.NODEMAILER_EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
