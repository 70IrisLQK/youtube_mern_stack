import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ErrorHandler } from '../utils/ErrorHandler.js';

config();

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET;

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token || req.params.token || req.query.token;
  if (!token) {
    next(ErrorHandler(401, 'You are not authenticated. Please try again.'));
  }

  await jwt.verify(token, TOKEN_SECRET_KEY, (error, result) => {
    if (error) {
      next(ErrorHandler(403, 'Invalid token. Please try again.'));
    }
    req.user = result;
    next();
  });
};
