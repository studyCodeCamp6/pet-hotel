const db = require("../models")
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const {
        // username,
        // password,
        hotelName,
        phoneNumber,
        email,
        optionalService,
        area,
        wage,
        type,
        address, } = req.body

    // req.file.{{ชื่อ field ใน Postman นะจ๊ะ}}
    // let { image } = req.files;
    // let fileExtension = image.name.split(".").slice(-1)[0];
    // let filePath = `/${(new Date()).getTime()}.${fileExtension}`;


    const target = await db.Providers.findOne({ where: { customer_id: req.user.id } })

    if (target) {
        res.status(400).send({ message: 'already have hotel' })
    } else {
        // const salt = bc.genSaltSync(Number(process.env.ROUNDS));
        // const hashedPW = bc.hashSync(password, salt);
        await db.Providers.create({
            // username,
            // password: hashedPW,
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

    }
}


const getProvider = async (req, res) => {
    try {
        const targetProvider = await db.Providers.findOne({ where: { customer_id: req.user.id } })
        res.status(201).send(targetProvider)
    }
    catch (err) {
        res.status(500).send(err)
    }

}














const updateProvider = async (req, res) => {
    const { hotelName, address, phoneNumber, email, area, type, wage } = req.body
    const { id } = req.params
    const targetProvider = await db.Providers.findOne({ where: { customer_id: req.user.id } })
    if (targetProvider) {
        await targetProvider.update({
            hotelName, address, phoneNumber, email, area, type, wage
        })
        res.status(201).send({ message: `Product ID : ${id} is updated` })
    } else {
        res.status(401).send({ message: " is not found" })
    }

}

const setRole = async (req, res) => {
    const currentId = Number(req.user.id)
    const { isProvider } = req.body
    const targetHotel = await db.Providers.findOne({ where: { customer_id: currentId } })

    if (!targetHotel) {
        res.send(400).send({ message: "hotel not found" })
    } else {
        const newUpdate = await targetHotel.update({
            isProvider
        })
        res.status(200).send(newUpdate)
    }
}

const getProviderToken = async (req, res) => {
    const currentId = Number(req.user.id)

    const targetHotel = await db.Providers.findOne({ where: { customer_id: currentId } })

    if (targetHotel) {
        const payload = {
            id: targetHotel.id,
            name: targetHotel.hotelName,
            status: targetHotel.status,
            isProvider: targetHotel.isProvider
        }
        const token = jwt.sign(payload,
            process.env.PROVIDER_SECRET,
            { expiresIn: `${process.env.TIMEOUT}d` }
        )

        res.status(200).send({
            provider_token: token
        })
    } else {
        res.status(400).send({ message: "hotel not found" })
    }
}

const getProviderReviews = async (req, res) => {
    const currentId = Number(req.user.id)
    const targetProvider = await db.Providers.findOne({ customer_id: currentId })

    if (targetProvider) {
        const providerId = targetProvider.id
        const reviews = await db.Reviews.findAll({ where: { provider_id: providerId } })
        if (reviews.length > 0) {
            res.status(200).send(reviews)
        } else {
            res.status(404).send({ message: 'your hotel have not been review yet' })
        }
    } else {
        res.status(400).send({ message: 'hotel not found' })
    }
}


module.exports = {
    register,
    getProvider,
    updateProvider,
    setRole,
    getProviderToken,
    getProviderReviews
}