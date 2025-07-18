import { emailTransporter } from "../utils/emailTransporter.js";

export const sendBathEmailNotification = async (req, res) => {
    const { subject, message, html, receiverEmail } = req.body;
    if (!Array.isArray(receiverEmail) || receiverEmail.length === 0) {
        return res.status(400).json({ errorMessage: 'Missing or invalid "receiverEmail" field: must be a non-empty array of email addresses.' });
    }
    if (!subject || (!message && !html)) {
        return res.status(400).json({ errorMessage: 'Missing required fields: subject, and message or html content.' });
    }
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: receiverEmail,
        subject: subject,
        text: message,
        html: html,
    };
    try {
        const result = await emailTransporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Batch email sent successfully!', messageId: result.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ errorMessage: 'Encountered an error while sending batch email notification.' });
    }

}

export const sendSingleEmailNotification = async (req, res) => {
    const { subject, message, html, receiverEmail } = req.body;
    if (!receiverEmail || typeof receiverEmail !== 'string' || receiverEmail.trim() === '') {
        return res.status(400).json({ errorMessage: 'Missing or invalid "receiverEmail" field: must be a single email address string.' });
    }
    if (!subject || (!message && !html)) {
        return res.status(400).json({ errorMessage: 'Missing required fields: subject, and message or html content.' });
    }
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: receiverEmail,
        subject: subject,
        text: message,
        html: html,
    };
    try {
        const result = await emailTransporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Batch email sent successfully!', messageId: result.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ errorMessage: 'Encountered an error while sending email notification.' });
    }
}

export const sendEmailsForInternalUse = async (receiverEmail, subject, content, isHtml = false) => {
    if (!receiverEmail || (Array.isArray(receiverEmail) && receiverEmail.length === 0) || (typeof receiverEmail !== 'string' && !Array.isArray(receiverEmail))) {
        console.error('Internal Email Error: Invalid or missing "receiverEmail" address(es).');
        return false;
    }
    if (!subject) {
        console.error('Internal Email Error: Missing "subject".');
        return false;
    }
    if (!content) {
        console.error('Internal Email Error: Missing "content".');
        return false;
    }

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: receiverEmail,
        subject: subject,
    };

    if (isHtml) {
        mailOptions.html = content;
    } else {
        mailOptions.text = content;
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Internal email sent successfully. To: ${Array.isArray(to) ? to.join(', ') : to}. Subject: "${subject}". Message ID: ${info.messageId}`);
        return true; // Indicate success
    } catch (error) {
        console.error(`Internal Email Error sending to ${Array.isArray(to) ? to.join(', ') : to}. Subject: "${subject}". Error:`, error);
        return false; // Indicate failure
    }
}