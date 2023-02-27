const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<div><p>Please confirm your email by clicking on the following link :  </p>
  <a href="${verifyEmail}">Verify Email</a></div>`;
  console.log(message);
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${name}</h4>
    ${message}
    <p>${verifyEmail}</p>
    `,
  });
};

module.exports = sendVerificationEmail;
