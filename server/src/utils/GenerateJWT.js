import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET;

export const generateToken = async (payload) => {
  return jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: '1d' });
};
