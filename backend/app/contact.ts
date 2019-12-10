var nodemailer = require('nodemailer');

/**
 * Uses Nodemailer to send different Mails to Clients.
 */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cooleseproject@gmail.com',
        pass: 'Ese2019Rockt'
    }
});

module.exports = {

    sendRegistrationConfirmation: function sendRegistrationConfirmation(clientMail: string) {
    var mailOptions = {
        from: 'cooleseproject@gmail.com',
        to: clientMail,
        subject: 'Registration Confirmation',
        text: 'Your Registration has been sent to us for Confirmation, you will hear from us shortly. \n best regards \n your Ese Team'
    };
    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
},

    sendRegistrationDenied: function sendRegistrationDenied(clientMail: string) {
        var mailOptions = {
            from: 'cooleseproject@gmail.com',
            to: clientMail,
            subject: 'Registration Denied',
            text: 'Your Registration to our Website has been denied. \nif you think this is a mistake please contact ou Administrator. \n best regards \n your Ese Team'
        };
        transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    sendValidatedEmail: function sendValidatedEmail(clientMail: string) {
    var mailOptions = {
        from: 'cooleseproject@gmail.com',
        to: clientMail,
        subject: 'Account confirmed',
        text: 'Your Account has been sent confirmed, you can now use our Website freely. \n best regards \n your Ese Team'
    };
    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
},
    sendNewPassword: function sendNewPassword(email: string, newPassword: string) {
    var mailOptions = {
        from: 'cooleseproject@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: 'Your Password has been reset, your new Password is: \n' + newPassword +'\n best regards \n your Ese Team'
    };
    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

};

