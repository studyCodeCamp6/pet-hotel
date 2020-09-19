const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getPetsByCustomers = async (req, res) => {

    const petsAll = await db.Pets.findAll({
        attributes: ["name",
            "BreedType",
            "sex",
            "weight",
            "other",
            "id"]
    })
    const result = petsAll.map(item => ({
        name: item.name,
        key: item.id,
        BreedType: item.BreedType,
        sex: item.sex,
        weight: item.weight,
        other: item.other,
        id: item.id

    }))



    res.status(201).send(result)
    // await db.Pets.findAll({include:{model : db.Pets}, where: {customer_id : req.customers.id} })
}

const addPets = async (req, res) => {
    try {
        const { body } = req.body
        const addPet = await db.Pets.create(body)
        res.status(200).send(addPet)
    }
    catch (err) {
        res.send(err)
    }
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
        const { cloneDataKeyPets, bodyDate, newServices } = req.body
        // console.log(bodyDate)
        // const addDog = await db.Pets.bulkCreate(cloneData)
        
        // console.log('pets' , petsID)
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
        // console.log("add cost =>", targetProvider)
        // const targetProviders = 


        const newBills = cloneDataKeyPets.map(item => ({
            pet_id: item.pet_id,
            bill_id: newDate.dataValues.id,
            cost: targetProvider.wage
        }))
        const addPets = await db.PetsBills.bulkCreate(newBills)
        console.log("bill pets", addPets)


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
    getPetsByCustomers,
    addPets
};