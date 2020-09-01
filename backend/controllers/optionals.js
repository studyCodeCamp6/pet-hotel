const db = require("../models");


const addOptionals = async (req, res) => {
    try {
        const { name } = req.body
        const newName = await db.OptionalServices.create({ name })
        res.status(201).send(newName)
    }
    catch (err) {
        res.send(err)
    }

}



module.exports = {
    addOptionals

}