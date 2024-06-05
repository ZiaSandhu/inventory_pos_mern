const db = require('../database/models');
const User = db.User;
const {hash} = require('bcryptjs')
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hash(password,8)
    const user = await User.create({ username, password:hashedPassword });
    res.status(201).json({user});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
};
