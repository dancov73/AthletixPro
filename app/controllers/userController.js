
const User = require('../models/user');

const createOrUpdateUser = async (req, res) => {
  const { role } = req.body;
  const roleArray = Array.isArray(role) ? role : role.split(',');

  await User.create({
    role: roleArray,
  });

  res.status(201).send('User created or updated successfully');
};

module.exports = {
  createOrUpdateUser,
};