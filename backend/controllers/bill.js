const db = require('../models')
const { Op } = require('sequelize')

const addBill = async (req, res) => {
    try {
        const { startDate, endDate, provider_id } = req.body
        const newDate = await db.Bills.create({
            startDate,
            endDate,
            optionalServices,
            status: "WAITING",
            customer_id: req.user.id
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
    try {
        const bill_id = Number(req.params.id)
        const targetBillReviews = await db.Reviews.findOne({ where: { bill_id } })

        if (targetBillReviews) {
            res.status(200).send(targetBillReviews)
        } else {
            res.status(404).send({ message: 'not found' })
        }

    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

const createNewReview = async (req, res) => {
    const score = Number(req.body.score),
        { review, bill_id, provider_id } = req.body;

    try {
        const reviewCheck = await db.Reviews.findAll({
            where: { bill_id }
        })
        console.log(reviewCheck)
        if (reviewCheck.length > 0) {
            res.status(400).send({ message: 'you can review only one time per process' })
        } else {
            await db.Reviews.create({
                score,
                bill_id,
                provider_id,
                comment: review
            })
            res.status(201).send({ message: 'review created' })
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    addBill,
    billOptionalService,
    getBillReview,
    createNewReview
}