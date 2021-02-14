const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fields = require('../src/lib/inquiry-form-fields');
const processEvent = require('./utils/processEvent');

const subject = 'Отправка формы "Запрос" с сайта';
exports.handler = async (event) => processEvent(sgMail, event, fields, subject);
