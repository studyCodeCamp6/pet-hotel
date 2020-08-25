const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerPets = async (req, res) => {
    const { name, breedType, weight, sex, image, other } = req.body

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({ message: "No files were uploaded." });
    }

    // req.file.{{ชื่อ field ใน Postman นะจ๊ะ}}
    let images = req.files.image;
    let fileExtension = images.name.split(".").slice(-1)[0];
    let filePath = `/${(new Date()).getTime()}.${fileExtension}`;
    console.log(images)
    images.mv(`images/${filePath}`);  // path อะไร

    const addDog = await db.Pets.create({
        // customer_id: req.user.id,
        certificate: filePath,
        image: filePath,
        name,
        breedType,
        weight,
        sex,
        other
    })
    res.status(201).send(addDog)
}

const deletePets = async (req, res) => {

}