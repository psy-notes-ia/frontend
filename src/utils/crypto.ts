import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCODING = 'hex';
const IV_LENGTH = 16;
const KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

export const DecryptData = (data: string) => {
  if (!KEY) {
    throw new Error('Encryption key is missing.');
  }
  
  const binaryData = Buffer.from(data, ENCODING);

  if (binaryData.length < IV_LENGTH) {
    throw new Error('The data is insufficiently long to contain the IV.');
  }

  const iv = binaryData.slice(binaryData.length - IV_LENGTH);
  const encryptedData = binaryData.slice(0, binaryData.length - IV_LENGTH);

  const keyBuffer = Buffer.from(KEY, 'utf-8');
  if (keyBuffer.length !== 32) {
    throw new Error('Key length is incorrect. AES-256 requires a 32-byte key.');
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);

  let decrypted;
  try {
    decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  } catch (err: any) {
    throw new Error('Decryption failed: ' + err.message);
  }
  
  return decrypted.toString();
}
