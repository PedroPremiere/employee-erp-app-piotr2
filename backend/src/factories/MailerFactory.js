class MailerFactory {
    static create(config, nodemailer) {
        return nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.user,
                pass: config.mail.password
            }
        });
    }
}

module.exports = MailerFactory;
