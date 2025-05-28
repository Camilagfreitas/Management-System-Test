import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret-key';

export const generateToken = (payload: object) =>
  jwt.sign(payload, SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET);
