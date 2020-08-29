const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, name, lastName, phoneNumber, email } = req.body;

  const targetUser = await db.Customers.findOne({ where: { username } });

  if (targetUser) {
    res.status(400).send({ message: "username already used" });
  } else {
    const salt = bc.genSaltSync(Number(process.env.ROUNDS));
    const hashedPW = bc.hashSync(password, salt);

    await db.Customers.create({
      username,
      name,
      lastName,
      phoneNumber,
      email,
      password: hashedPW,
    });
    res.status(201).send({ message: "user created" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const targetUser = await db.Customers.findOne({ where: { username } });
  if (!targetUser) {
    res.status(400).send({ message: "Username or Password not correct" });
  } else {
    const isPWCorrect = bc.compareSync(password, targetUser.password);
    if (isPWCorrect) {
      const payload = {
        id: targetUser.id,
        name: targetUser.name,
        status: targetUser.status,
      };
      console.log(process.env.TIMEOUT)
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: `${process.env.TIMEOUT}d`,
      });
      res.status(201).send({
        message: "successfully login",
        access_token: token,
        accessToken: token,
      });
    } else {
      res.status(400).send({ message: "Username or Password is wrong" });
    }
  }
};

module.exports = {
  register,
  login,
};
