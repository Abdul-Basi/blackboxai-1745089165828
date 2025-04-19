const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_ROUNDS = 10;

async function createUser(data) {
  try {
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = await User.create({
      username: data.username,
      passwordHash,
      role: data.role,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new Error('Invalid password');
    }
    return { id: user.id, username: user.username, role: user.role };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  authenticateUser,
};
