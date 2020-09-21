const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize')

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
        isCustomer: targetUser.isCustomer
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: `${process.env.TIMEOUT}d` });

      res.status(200).send({
        message: "successfully login",
        access_token: token,
        accessToken: token,
      });
    } else {
      res.status(400).send({ message: "Username or Password is wrong" });
    }
  }
};

const setRole = async (req, res) => {
  const currentId = Number(req.user.id)
  const { isCustomer } = req.body

  const targetUser = await db.Customers.findOne({ where: { id: currentId } })
  if (!targetUser) {
    res.status(400).send({ message: "user not found" })
  } else {
    const newUpdate = await targetUser.update({
      isCustomer
    })
    res.status(200).send(newUpdate)
  }
}

const getProfile = async (req, res) => {
  const currentId = Number(req.user.id)
  const targetProfile = await db.Customers.findOne({ where: { id: currentId } })

  if (!targetProfile) {
    res.status(404).send({ message: 'user not found' })
  } else {
    res.status(200).send(targetProfile)
  }
}

const searchingProvidersByHotelName = async (req, res) => {
  const { hotelName } = req.body
  const hotelLists = await db.Providers.findAll({
    where: {
      hotelName: {
        [Op.like]: `%${hotelName}%`
      }
    }
  })

  if (hotelLists.length <= 0) {
    res.status(404).send({
      message: `${hotelName} not found`
    })
  } else {
    res.status(200).send(hotelLists)
  }
}

const searchingProvidersByPetType = async (req, res) => {
  const { hotelType } = req.body
  const hotelLists = await db.Providers.findAll({
    where: {
      type: {
        [Op.like]: `%${hotelType}%`
      }
    },
    order: [
      [hotelName, 'DESC']
    ]
  })

  if (hotelLists.length <= 0) {
    res.status(404).send({ message: `${hotelType} not found` })
  } else {
    res.status(200).send(hotelLists)
  }
}

const createNewReview = async (req, res) => {
  
}

const getAllReview = async (req, res) => {
  console.log("all review")
}

const getReviewDetails = async (req, res) => {
  console.log("review's detail")
}

const editReview = async (req, res) => {
  console.log("edit review")
}

module.exports = {
  register,
  login,
  setRole,
  getProfile,
  searchingProvidersByHotelName,
  searchingProvidersByPetType,
  createNewReview,
  getAllReview,
  getReviewDetails,
  editReview
};
