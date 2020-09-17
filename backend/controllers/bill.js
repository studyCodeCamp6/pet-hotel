const db = require('../models')

const addBill = async (req, res) => {
    try {
        const { startDate, endDate, provider_id } = req.body
        const newDate = await db.Bills.create({
            startDate,
            endDate,
            optionalServices,
            status:"WAITING",
            customer_id:req.user.id
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

const getBillReview = async (req, res) => {
    const currentId = Number(req.user.id)
    const pet = await db.Pets.findAll({ where: { customer_id: currentId } })
    console.log(pet)
}

const createNewReview = async (req, res) => {

}

module.exports = {
    addBill,
    billOptionalService,
    getBillReview,
    createNewReview
}