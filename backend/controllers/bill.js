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
    const currentId = Number(req.user.id)
    const { bill_id } = req.body
    const targetBillReviews = await db.Reviews.findOne({ where: { bill_id } })
    if (currentId && targetBillReviews) {
        res.status(200).send(targetBillReviews)
    } else {
        res.status(404).send({ message: 'not found' })
    }
}

const createNewReview = async (req, res) => {
    const currentCustomer = Number(req.user.id)
    const score = Number(req.body.score),
        { review } = req.body;

    const targetBill = await db.Bills.findAll({
        where: {
            customer_id: currentCustomer
        }
    })


    if (!targetBill) {
        res.status(400).send({ message: 'you can not review now' })
    } else {
        try {
            for (let i = 0; i < targetBill.length; i++) {
                if (targetBill[i].status === 'COMPLETE') {
                    const reviewCheck = await db.Reviews.findAll({
                        where: { bill_id: targetBill[i].id }
                    })
                    if (!reviewCheck) {
                        await db.Reviews.create({
                            score,
                            comment: review,
                            bill_id: targetBill[i].id,
                            provider_id: targetBill[i].provider_id
                        })
                        res.status(201).send({ message: 'review created' })
                    } else {
                        res.status(400).send({ message: 'you can review only one time per process' })
                    }
                } else {
                    res.send({ message: 'you can not review now' })
                }
            }
        } catch (err) {
            res.status(400).send(err)
        }
    }
}

module.exports = {
    addBill,
    billOptionalService,
    getBillReview,
    createNewReview
}