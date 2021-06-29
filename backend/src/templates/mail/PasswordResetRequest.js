class PasswordResetRequest {
    constructor(config) {
        this.config = config;
    }
    generateMessage(user, code) {
        const message = {};
        const link = `${this.config.app.frontendUrl}/password-reset/${code}`;
        message.subject = 'Password Reset';
        message.text = `Dear ${user.firstName}. Click this link to reset your password : ${link} Best Regards Erp Team `;
        message.html = `<H2> Dear ${user.firstName}.</H2> <P> Click this link to reset your password :</P> <p> <a href ="${link}" > ${link} </a> </P> <P>Best Regards.</P> <P>Erp Team</P> `;

        return message;
    }
}

module.exports = PasswordResetRequest;
