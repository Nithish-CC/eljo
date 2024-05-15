// Import Nodemailer
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD

    }
});

async function sendWelcomeEmail({first_name, email, password }) {
    const htmlTemplate = fs.readFileSync('./src/template/welcome_email_template.html', 'utf-8');

    const replacedHtml = htmlTemplate
        .replaceAll('{{first_name}}', first_name)
        .replace('{{email}}', email)
        .replace('{{password}}', password.toString());

    try {
        // Setup email data
        let mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: email, // List of receivers
            subject: 'Welcome to Eljo', // Subject line
            text: `Hello ${first_name}, this is a test email!`, // Plain text body
            html: replacedHtml // HTML body
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred:', error);
            }
        });

    } catch (error) {
        console.error('Error creating employee:', error);
    }
}

module.exports = {
    sendWelcomeEmail
}