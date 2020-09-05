const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getPetsByCustomers = async (req, res) => {
    console.log(req.user)
    const petsAll = await db.Pets.findAll()
    res.status(201).send(petsAll)
    // await db.Pets.findAll({include:{model : db.Pets}, where: {customer_id : req.customers.id} })
}

const registerPets = async (req, res) => {
    const { name, breedType, weight, sex, other } = req.body

    // if (!req.files || Object.keys(req.files).length === 0) {
    //     res.status(400).send({ message: "No files were uploaded." });
    // }

    // let  image  = req.files.image;
    // let fileExtension = image.name.split(".").slice(-1)[0];
    // let filePath = `/${(new Date()).getTime()}.${fileExtension}`;
    // image.mv(`image/${filePath}`);  // path อะไร

    const addDog = await db.Pets.create({
        // customer_id: req.customer.id,
        // certificate: filePath,
        // image: filePath,
        name,
        breedType,
        weight,
        sex,
        other
    })
    res.status(201).send({ message: `Add New Pets Success.` })
}

const deletePets = async (req, res) => {
    const { id } = req.params
    const targetId = await db.Pets.findOne({ where: { id } })
    if (targetId) {
        await targetId.destroy()
        res.status(201).send({ message: `ID : ${targetId.id}` })
    }
}


module.exports = {
    registerPets,
    deletePets,
    getPetsByCustomers
};