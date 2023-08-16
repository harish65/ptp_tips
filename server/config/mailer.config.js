// /////////////////////////////////////////////////////
//  -   Mailer configuration stored here
// /////////////////////////////////////////////////////

const nodemailer = require('nodemailer');
//const moment = require('moment');
const Templates = require('./emails.config');

//var smtpTransport = nodemailer.createTransport(
//  {
//    host: 'secure.emailsrvr.com',
//    port: 465,
//    auth: {
//      user: 'support@ptptips.com.au',
//      pass: 'Grape394Panda'
//    },
//  });

var smtpTransport = nodemailer.createTransport(
  {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    //secure: true,
    auth: {
      user: 'AKIA32WP5JRTGI6SCGEV',
      pass: 'BFRPxXwfi9oVzN6djnqFahhQ0c8iTfbKsxZi4QCx8pOQ'
    },
  });

// web-Push keys  
const publicVapidKey = "BLhr5SZ93oBs6dbEq0EvUgn72Yxp28hzNLa5_FQG-AS0OUxbwgUQnPGf9W4NFq_0dQ02lxLOIj409zpJMJ4Kd-4";
const privateVapidKey = "Ul7gsCD2XmSG7Sf1OY3PaTpWTvFEmMZH_vIKUmBtWS8";

/* VISION6 */
//pasttheposttips@gmail.com
//dWe2u5UfRh4@NMk





// Mail templates
const contactUs = (name, message) => {
  return Templates.contactUs(name, message)
}

const contactUsTeam = (fName, lName, email, phone, message, ip) => `
    Contact Us email received from:<br/> <br/>
    email: '${email}' <br/>
    first Name: '${fName}' <br/>
    last Name: '${lName}' <br/>
    phone: '${phone}' <br/>
    message: '${message}' <br/>
    ip: '${ip}' <br/>
    Please response within 48 hours.<br>
    regards,
    <br/>
     Support Team
    <br/>`;

const verificationForClient = (link) => {
  return Templates.verify(link)
}

const clientRegistration = details => `
    Hello,<br/> <br/>
    A new client has been successfully completed registration with the following details:<br>
    '${details}'<br>
    <br/>
    Sincerely,
    <br/>
     PTP TIPS Team
    <br/>`;

const wrongCredential = email => `
    Hello,<br/> <br/>
    ${email} is trying to sign in but he haven't signed up yet.<br>
    <br>
    <br/>
    Sincerely,
    <br/>
     PTP TIPS Team
    <br/>`;

const wrongCredentialUser = email => `
    Hello,<br/> <br/>
    ${email} is trying to sign in with wrong password.<br>
    <br>
    <br/>
    Sincerely,
    <br/>
     PTP TIPS Team
    <br/>`;

const forgotClientPassword = link => {
  return Templates.resetPassword(link);
}

const passwordReset = (link) => {
  return Templates.afterReset(link)
}

const welcome = (email, expDate, packageDescription) => {
  return Templates.welcomeEmail(email, expDate, packageDescription)
}

const policyUpdate = (link) => {
  return Templates.policyUpdate(link)
}

const selectionsEmail = () => {
  return Templates.selections()
}

const notification = (name, venue, raceNumber, link) => {
  return Templates.notification(name, venue, raceNumber, link)
}

module.exports = {
  smtpTransport,
  templates: {
    contactUs,
    contactUsTeam,
    verificationForClient,
    clientRegistration,
    wrongCredential,
    wrongCredentialUser,
    forgotClientPassword,
    passwordReset,
    welcome,
    selectionsEmail,
    policyUpdate,
    notification
  },
  publicVapidKey,
  privateVapidKey,
};