import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const signUp = async (req, res) => {
  const { id, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ id, password: hashedPassword });
    
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET);
    
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    delete user.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user information' });
  }
};
