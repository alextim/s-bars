const fields = require('../../config/form/inquiry-form-fields');
const processFormSubmission = require('../utils/processFormSubmission');

const subject = 'Отправка формы "Запрос" с сайта';
exports.handler = async (event) => processFormSubmission(event, fields, subject);
