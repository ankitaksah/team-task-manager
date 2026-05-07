const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // CHECK USER
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res.status(400).json({
        message: 'User already exists',
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      role,

    });

    res.status(201).json({
      message: 'Signup successful',
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error',
    });

  }

};


// LOGIN
exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: 'Invalid email',
      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid password',
      });

    }

    // CREATE TOKEN
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      'secretkey',

      {
        expiresIn: '1d',
      }

    );

    // RESPONSE
    res.status(200).json({

      message: 'Login successful',

      token,

      role: user.role,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error',
    });

  }

};