const db = require("../models");


const getService = async (req, res) => {
    try {
        const getData = await db.OptionalServices.findAll()
        res.status(201).send(getData)
    }
    catch (err) {
        res.status(500).send(err)
    }
}



const addOptionals = async (req, res) => {
    const { name } = req.body
    console.log(req.user)
    const newName = await db.OptionalServices.bulkCreate(name);
    // res.status(201).send(newName)


    const newResponse = newName.map(item => ({ service_id: item.dataValues.id, provider_id: req.user.id }))
    const newService = await db.ProviderOptionalServices.bulkCreate(newResponse)
    console.log(newResponse)
    res.status(201).send(newService)

}

module.exports = {
    addOptionals,
    getService

}