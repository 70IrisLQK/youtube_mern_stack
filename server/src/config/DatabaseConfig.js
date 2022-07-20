import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const MONGO_URL = process.env.MONGO_URL;

const connectDatabase = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Connect DB success');
    })
    .catch((error) => {
      console.log('Connect DB failed', error.message);
    });
};

export default connectDatabase;
