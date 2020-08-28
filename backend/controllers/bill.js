const db = require('../models')



const addBill = async (req, res) => {
    try {
        const { startDate, endDate, optionalServices } = req.body
        await db.Bills.create({
            startDate,
            endDate,
            optionalServices
        })
        res.status(201).send({ message: "Add bills success" })
    }
    catch (err) {
        res.send(Error)
    }
}

module.exports = {
    addBill
}