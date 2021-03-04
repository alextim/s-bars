const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fields = require('../src/lib/form/contact-form-fields');
const processEvent = require('./utils/processEvent');

const subject = 'Contact Form Submission';
exports.handler = async (event) => processEvent(sgMail, event, fields, subject);
