class SendMailHandler {
    constructor(mailer, config) {
        this.mailer = mailer;
        this.config = config;
    }

    handle(receiver, subject, text, html) {
        const mailOptions = {
            from: `"${this.config.mail.fromName}" ${this.config.mail.fromAddress}`,
            to: receiver,
            subject,
            text,
            html
        };

        this.mailer.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    }
}

module.exports = SendMailHandler;
