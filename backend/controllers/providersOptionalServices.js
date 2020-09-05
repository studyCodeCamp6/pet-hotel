const db = require("../models")


const addProviderService = async (req, res) => {
    const {service_id, provider_id} = req.body
     
    try {
        const newData = await db.ProviderOptionalServices.create(
            {
                service_id,
                provider_id
            }
        )
        res.status(201).send(newData)
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
    }
}
module.exports = {
    addProviderService
}