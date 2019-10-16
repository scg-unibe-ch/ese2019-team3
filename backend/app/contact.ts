var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cooleseproject@gmail.com',
        pass: 'Ese2019Rockt'
    }
});

function sendRegistrationConfirmation(clientMail: string) {
    var mailOptions = {
        from: 'cooleseproject@gmail.com',
        to: clientMail,
        subject: 'Registration Confirmation',
        text: 'Your Registration has been sent to us for Confirmation, you will hear from us shortly. \n best regards \n your Ese Team'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendValidatedEmail(clientMail: string) {
    var mailOptions = {
        from: 'cooleseproject@gmail.com',
        to: clientMail,
        subject: 'Account confirmed',
        text: 'Your Account has been sent confirmed, you can now use our Website freely. \n best regards \n your Ese Team'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendNewPassword(clientMail: string, newPassword: string) {
    var mailOptions = {
        from: 'cooleseproject@gmail.com',
        to: clientMail,
        subject: 'Reset Password',
        text: 'Your Password has been reset, your new Password is: \n' + newPassword +'\n best regards \n your Ese Team'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
