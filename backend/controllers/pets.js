const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getPetsByCustomers = async (req, res) => {

    const petsAll = await db.Pets.findAll()
    res.status(201).send(petsAll)
    // await db.Pets.findAll({include:{model : db.Pets}, where: {customer_id : req.customers.id} })
}

const registerPets = async (req, res) => {

    // if (!req.files || Object.keys(req.files).length === 0) {
    //     res.status(400).send({ message: "No files were uploaded." });
    // }

    // let  image  = req.files.image;
    // let fileExtension = image.name.split(".").slice(-1)[0];
    // let filePath = `/${(new Date()).getTime()}.${fileExtension}`;
    // image.mv(`image/${filePath}`);  // path อะไร

    try {
        const { cloneData, bodyDate, newServices } = req.body
        // console.log(bodyDate)
        const addDog = await db.Pets.bulkCreate(cloneData)
        // console.log('pets' , addDog)

        // certificate: filePath,
        // image: filePath,
        const newDate = await db.Bills.create(bodyDate)
        // console.log("bill Date", newDate)

        // const newResponse = { bill_id: newDate.dataValues.id }


        const myId = req.user.id
        const targetProvider = await db.Providers.findOne({
            where: { id: myId },
            // attributes: ['wage']
        })
        console.log("add cost =>", targetProvider)
        // const targetProviders = 


        const newBills = addDog.map(item => ({
            pet_id: item.dataValues.id,
            bill_id: newDate.dataValues.id,
            cost: targetProvider.wage
        }))
        const addPets = await db.PetsBills.bulkCreate(newBills)
        // console.log("bill pets", addPets)


        // bill service
        const newDataServices = newServices.map(item => ({ service_id: item.service_id, bill_id: newDate.dataValues.id }))
        const newData = await db.BillOptionalServices.bulkCreate(newDataServices)
        // console.log("bill service", newData)

        res.status(201).send({ message: `Add New Pets Success.` })
    }
    catch (err) {
        console.log(err)
    }
}

const deletePets = async (req, res) => {
    const { id } = req.params
    const targetId = await db.Pets.findOne({ where: { id } })
    if (targetId) {
        await targetId.destroy()
        res.status(201).send({ message: `ID : ${targetId.id}` })
    }
}


module.exports = {
    registerPets,
    deletePets,
    getPetsByCustomers
};