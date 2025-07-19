const db = require('../db');
const { sendEmail } = require('../utils/mailer');
const { Parser } = require('json2csv');

exports.sendEmails = async (req, res) => {
  const { subject, body, recipients } = req.body;

  const results = [];
  for (let email of recipients) {
    try {
      const response = await sendEmail(email, subject, body);
      console.log(response);
      await db.query(
        'INSERT INTO email_logs (subject, body, recipient_email, status) VALUES (?, ?, ?, ?)',
        [subject, body, email, 'Sent']
      );
      results.push({ email, status: 'Sent' });
    } catch (error) {
      await db.query(
        'INSERT INTO email_logs (subject, body, recipient_email, status) VALUES (?, ?, ?, ?)',
        [subject, body, email, 'Failed']
      );
      results.push({ email, status: 'Failed' });
    }
  }

  res.json({ message: 'Emails processed', results });
};

exports.getLogs = async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;

  const [logs] = await db.query('SELECT * FROM email_logs ORDER BY timestamp DESC LIMIT ? OFFSET ?', [limit, offset]);
  const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM email_logs');

  res.json({ logs, total: count });
};

exports.exportLogs = async (req, res) => {
  const [logs] = await db.query('SELECT * FROM email_logs');
  const parser = new Parser();
  const csv = parser.parse(logs);
  res.header('Content-Type', 'text/csv');
  res.attachment('email_logs.csv');
  return res.send(csv);
};
