const db = require('../models');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;

  const targetUser = await db.Admins.findOne({ where: { username } });

  if (targetUser) {
    res.status(400).send({ message: 'username already used' });
  } else {
    const salt = bc.genSaltSync(Number(process.env.ROUNDS));
    const hashedPW = bc.hashSync(password, salt);

    await db.Admins.create({
      username,
      password: hashedPW,
    });
    res.status(201).send({ message: 'Admin created' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const targetUser = await db.Admins.findOne({ where: { username } });
  if (!targetUser) {
    res.status(400).send({ message: 'Username or Password not correct' });
  } else {
    const isPWCorrect = bc.compareSync(password, targetUser.password);
    if (isPWCorrect) {
      const payload = {
        id: targetUser.id,
        isAdmin: targetUser.isAdmin,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: `${process.env.TIMEOUT}d`,
      });

      res.status(200).send({
        message: 'successfully login',
        access_token: token,
        accessToken: token,
      });
    } else {
      res.status(400).send({ message: 'Username or Password is wrong' });
    }
  }
};

const setRole = async (req, res) => {
  const currentId = Number(req.user.id);
  const { isAdmin } = req.body;

  const targetUser = await db.Admins.findOne({ where: { id: currentId } });
  if (!targetUser) {
    res.status(400).send({ message: 'user not found' });
  } else {
    const newUpdate = await targetUser.update({
      isAdmin,
    });
    res.status(200).send(newUpdate);
  }
};

const getProfile = async (req, res) => {
  const currentId = Number(req.user.id);
  const targetProfile = await db.Admins.findOne({ where: { id: currentId } });

  if (!targetProfile) {
    res.status(404).send({ message: 'user not found' });
  } else {
    res.status(200).send(targetProfile);
  }
};

module.exports = {
  register,
  login,
  setRole,
  getProfile,
};
