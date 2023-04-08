const nodemailer = require("nodemailer");
require("dotenv").config();

const emailSender = async ({ to, html, subject }) => {
  try {
    const email = {
      from: "testgoit1@meta.ua",
      to,
      subject,
      html,
    };

    const transport = nodemailer.createTransport({
      host: "smtp.meta.ua",
      port: 465,
      auth: {
        user: "testgoit1@meta.ua",
        pass: process.env.PASSWORD,
      },
    });

    await transport.sendMail(email);
  } catch (err) {
    return err.message;
  }
};

module.exports = { emailSender };
