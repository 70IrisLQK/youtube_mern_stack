import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDatabase from './config/DatabaseConfig.js';
import routes from './routers/index.js';
dotenv.config();

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser());

// Connect DB mongoose
connectDatabase();

// Connect routes api
app.use('/api/v1', routes.AuthRoute);
app.use('/api/v1', routes.VideoRoute);
app.use('/api/v1', routes.CommentRoute);
app.use('/api/v1', routes.UserRoute);

// Handler error
app.use((err, req, res, next) => {
  const status = err.status;
  const message = err.message || 'Something went wrong. Please try again';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Running server
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log('Server running at %s', PORT);
});
