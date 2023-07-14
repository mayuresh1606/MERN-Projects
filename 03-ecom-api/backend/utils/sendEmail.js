const nodeMailer = require("nodemailer")

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
}

module.exports = sendEmail;