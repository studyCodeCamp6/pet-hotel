const db = require("../models")
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    console.log("register provider")
    const {
        username,
        password,
        hotelName,
        phoneNumber,
        email,
        optionalService,
        area,
        wage,
        type,
        address
    } = req.body

    // req.file.{{ชื่อ field ใน Postman นะจ๊ะ}}
    // let { image } = req.files;
    // let fileExtension = image.name.split(".").slice(-1)[0];
    // let filePath = `/${(new Date()).getTime()}.${fileExtension}`;


    const target = await db.Providers.findOne({ where: { customer_id: req.user.id } })

    if (target) {
        res.status(400).send({ message: 'already have hotel' })
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUNDS));
        const hashedPW = bc.hashSync(password, salt);
        await db.Providers.create({
            username,
            password : hashedPW,
            hotelName,
            phoneNumber,
            email,
            optionalService,
            area,
            wage,
            type,
            address,
            // image: filePath,
            customer_id: req.user.id
        })

        // image.mv(`images/providers/${filePath}`);
        res.status(201).send({ message: 'hotel created' })
    }
}

module.exports = {
    register
}