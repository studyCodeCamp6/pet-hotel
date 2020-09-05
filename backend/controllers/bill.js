const db = require('../models')

const addBill = async (req, res) => {
    try {
        const { startDate, endDate, provider_id } = req.body
        const newDate = await db.Bills.create({
            startDate,
            endDate,
            provider_id,
            status: 'waiting'
        })
        const newResponse = newDate.dataValues.id
        console.log(newResponse)
        const dataDate = await db.PetsBills.create({ bill_id: newResponse })

        res.status(201).send(dataDate)
    }
    catch (err) {
        res.send(Error)
    }
}

const billOptionalService = async (req, res) => {
    const { newServices } = req.body
    await db.BillOptionalServices.bulkCreate(newServices)

}

module.exports = {
    addBill,
    billOptionalService
}