const db = require("../models")

const register = async (req, res) => {
    const { hotelName,
        phoneNumber,
        email,
        optionalService,
        area,
        wage,
        type,
        homeNumber,
        moo,
        lane,
        subDistrict,
        district,
        province,
        zipCode
    } = req.body

    // req.file.{{ชื่อ field ใน Postman นะจ๊ะ}}
    let image = req.files.image;
    let fileExtension = image.name.split(".").slice(-1)[0];
    let filePath = `/${(new Date()).getTime()}.${fileExtension}`;

    image.mv(`images/providers/${filePath}`);

    const target = await db.Customers.findOne({ where: req.user })

    res.status(200).send(sendObject)
}

module.exports = {
    register
}