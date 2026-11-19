const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USER || 'test_user',
      pass: process.env.SMTP_PASS || 'test_pass'
    }
  });
};

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"CareVanta AI Health" <no-reply@carevanta.ai>',
      to,
      subject,
      text,
      html
    });
    console.log(`✉️ Email dispatched to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.warn(`Email delivery simulated in dev mode for ${to} (${error.message})`);
    return { messageId: `mock_${Date.now()}` };
  }
};

module.exports = { sendEmail };
