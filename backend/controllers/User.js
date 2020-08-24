const db = require('../models')
const bc = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req, res) => {
    const {
        username,
        password,
        name,
        lastName,
        phoneNumber,
        email,
        wallet_id,
        wallet,
        status
    } = req.body

    const targetUser = await db.Customers.findOne({ where: { username } })

    if (targetUser) {
        res.status(400).send({ message: "Username already used" })
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUND))
        const hashedPW = bc.hashSync(password, salt)

        await db.Customers.create({
            password: hashedPW,
            username,
            name,
            lastName,
            phoneNumber,
            email,
            wallet_id,
            wallet,
            status
        })
        res.status(201).send({ message: "User created" })
    }
}

const registerPet = (req, res) => {
    const { name, type, weight, sex, other } = req.body
    if (!req.file || Object.keys(req.files).length === 0) {
        res.status(400).send({ message: "No files were uploaded." });
    }
    let image = req.files.image
    let fileExtension = image.name.split('.').slice(-1)[0]
    let filePath = `/${(new Date()).getTime()}.${fileExtension}`;
    image.mv(`images/${filePath}`);

    // await db.create({
    //     image_url: filePath,
    //     name,
    //     type,
    //     weight,
    //     sex,
    //     other
    // })
}

module.exports = {
    register,
    registerPet
}