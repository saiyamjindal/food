const nodemailer = require("nodemailer");
const config = require("../config/secrets");
module.exports = async function sendEmail(option) {
  try {
    // email configuration=> transport
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com", 
      secure: true,
      auth: {
        user: "jindal.saiyam123@gmail.com",
        pass: config.APP_PASSWORD
      }
    })
    // email options
    const emailOptions = {
      from: "everyone@gmail.com",
      to: option.to,
      subject: option.subject,
      text: "I am testing email",
      html: option.html
    }
    // send mail
    await transport.sendMail(emailOptions);
  } catch (err) {
    console.log(err);
  }
}