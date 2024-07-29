const nodemailer = require("nodemailer");

const sendEmail = async options => {

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:  465,
        secure: true,
        auth: {
           user: "andrespradah@gmail.com",
           pass: "kudnzzhxednsupva"
        }
    });

    const mensaje = {
        from: "Sistema Erp <Sistema@gmail.com.com>",
        to: options.email,
        subject: options.subject,
        // text: options.mensaje
        html: options.mensaje
    }

    await  transport.sendMail(mensaje)
}

module.exports = sendEmail