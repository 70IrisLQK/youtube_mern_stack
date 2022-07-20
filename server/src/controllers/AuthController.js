import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { generateToken } from '../utils/GenerateJWT.js';

const AuthController = {
  register: async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
      if (!username || !password || !email) {
        next(
          ErrorHandler(
            500,
            'All field is required to register. Please try again.'
          )
        );
      }

      // Check old user
      const isUser = await UserModel.findOne({ username: username });
      if (isUser) {
        next(ErrorHandler(500, 'Username is already exist. Please try again.'));
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();
      return res.status(201).json({ message: 'User register successfully.' });
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        next(
          ErrorHandler(
            500,
            'All field is required to register. Please try again.'
          )
        );
      }

      // Check user exist
      const isUser = await UserModel.findOne({ username: username });
      if (!isUser) {
        next(ErrorHandler(500, 'Username does not exist. Please try again.'));
      }

      // Check password
      const comparePassword = await bcrypt.compare(password, isUser.password);

      if (isUser && comparePassword) {
        const token = await generateToken({ id: isUser._id });

        res
          .cookie('access_token', token, {
            httpOnly: true,
            maxAge: 86400000,
          })
          .status(200);

        return res.status(200).json(isUser);
      }

      next(
        ErrorHandler(500, 'Invalid username or password. Please try again.')
      );
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
  googleAuth: async (req, res, next) => {
    const { email } = req.body;
    try {
      const isUser = await UserModel.findOne({ email: email });

      if (isUser) {
        const token = await generateToken({ id: isUser._id });

        res
          .cookie('access_token', token, {
            httpOnly: true,
            maxAge: 86400000,
          })
          .status(200);

        return res.status(200).json(isUser._doc);
      } else {
        const newUser = new UserModel({
          ...req.body,
          fromGoogle: true,
        });

        const savedUser = await newUser.save();

        const token = await generateToken({ id: savedUser._id });

        res
          .cookie('access_token', token, {
            httpOnly: true,
            maxAge: 86400000,
          })
          .status(200);

        return res.status(200).json(savedUser._doc);
      }
    } catch (error) {
      next(ErrorHandler(500, error.message));
    }
  },
};

export default AuthController;
