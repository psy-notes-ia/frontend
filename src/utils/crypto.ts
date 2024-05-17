import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'hex';
const IV_LENGTH = 16;
const KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

export const DecryptData = (data: string): string => {
  const key = Buffer.from(KEY!, 'base64');
  const iv = Buffer.from(IV_LENGTH.toString(), 'base64');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
