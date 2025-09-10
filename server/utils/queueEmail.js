import Queue from 'bull';
import { queryDB } from '../utils/pgConnection,js';

const emailQueue = new Queue('email-queue', { redis: { host: '127.0.0.1', port: 6379 } });

export async function queueEmail({ to_email, subject, body }) {
  const result = await queryDB(
    `INSERT INTO email_queue (to_email, subject, body) VALUES (?, ?, ?)`,
    [to_email, subject, body]
  );

  const id = result.insertId || result[0].id;
  emailQueue.add({ id, to_email, subject, body, retries: 0 });
}
