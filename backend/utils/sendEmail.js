const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const sendEmail = async (options) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  // Set the access and refresh tokens for the Gmail API
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
    access_token: process.env.ACCESS_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
