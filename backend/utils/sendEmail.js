const nodeMailer = require('nodemailer');
const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: message
    };  

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;