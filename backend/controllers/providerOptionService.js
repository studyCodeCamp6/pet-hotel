const db = require("../models")

const getService = async (req, res) => {

    const target = await db.Providers.findOne({
        where: { id: req.user.id },
        include: {
            model: db.ProviderOptionalServices,
            include: { model: db.OptionalServices }
        }
    })
    res.status(200).send(target.ProviderOptionalServices)

}

const deleteService = async (req, res) => {
    const { id } = req.params
    const targetId = await db.ProviderOptionalServices.findOne({ where: { id } })

    if (targetId) {
        await targetId.destroy()
        res.status(201).send({ message: "deleted" })
    } else {
        res.status(401).send({ message: "can't delete " })

    }
}

module.exports = {
    getService,
    deleteService
}