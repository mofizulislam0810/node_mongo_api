
import mongoose from "mongoose";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
const ObjectId = mongoose.Types.ObjectId;


export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(201).json({ message: 'User already registered' });
    }
    const user = new User({ fullName, email, password, isVerified: false, role: "user", isRemove: false, isActivate: false });
    const secret = speakeasy.generateSecret({ length: 20 });
    user.secret = secret.base32;
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const varifyUser = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ secret: String(token) });
    if (!user) {
      res.send('User not found.');
      return;
    }
    if (user.isVerified) {
      res.send('Email already verified.');
      return;
    }
    user.isVerified = true;
    await user.save();
    res.send('Email verified successfully.');
  } catch (err) {
    console.error(err);
    res.send('Email verification failed.');
  }
}



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // const passwordMatch = await bcrypt.compare(password, user.password);
    if (!password) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    if (!user.isVerified) {
      return res.status(201).json({ message: 'Account does not varified' });
    }
    // if (!user.isActivate) {
    //   return res.status(201).json({ message: 'Account is inactive' });
    // }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
    res.status(200).json({ token, refreshToken, user });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
}

export const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  });
}


export const protectedChecked = (req, res) => {
  res.json({ message: 'This route is protected' });
}