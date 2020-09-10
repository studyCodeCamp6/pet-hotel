const { Op } = require("sequelize");
const db = require("../models");

/* =============  Customer Bill =============*/

const getCustomerBills = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Bills.findAll({
      where: { customer_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["id", "provider_id", "startDate", "endDate", "status"],
      include: [{ model: db.Providers, attributes: ["hotelName", "phoneNumber", "email", "area", "wage", "type", "image", "address", "status", "isOpen"], }, { model: db.PetsBills, attributes: [["bill_id", "pet_id"]], include: { model: db.Pets, attributes: ["name", "breedType", "weight", "sex", "certificate", "image", "other"] } }]
    });


    if (!targetBill) {
      res.status(404).send({ message: `Not Found bill ID: ${id}` });
    } else {
      const billToCustomers = await Promise.all(
        targetBill.map((provider) => {
          return db.Providers.findAll({
            where: { id: provider.provider_id },
            attributes: ["hotelName", "address"],
            raw: true,
          });
        })
      );
      res.send({ targetBill });
    }
  } catch (error) {
    res.send(error);
  }
};

const CreateCustomerBills = async (req, res) => {
  try {
    const { startDate, endDate, optionalServices, provider_id } = req.body;
    const myId = req.user.id;
    const targetBill = await db.Bills.findOne({
      include: db.providers,
      include: db.pets,
      where: {
        [Op.and]: [
          { customer_id: myId },
          { provider_id: provider_id },
          { startDate: startDate },
          { endDate: endDate },
        ],
      },
    });
    if (!targetBill) {
      const customerBills = await db.Bills.create({
        startDate,
        endDate,
        optionalServices,
        provider_id,
        status: "waiting",
        customer_id: req.user.id,
      });
      res.status(201).send({ message: "booking successful", customerBills });
    } else {
      res
        .status(401)
        .send({ message: `You have a book already. on`, targetBill });
    }
  } catch (error) {
    res.send(error);
  }
};

const UpdateCustomerBIlls = async (req, res) => {
  try {
    const { bId } = req.params;
    const myId = req.user.id;
    const targetBill = await db.Bills.findOne({
      where: {
        [Op.and]: [{ id: bId }, { customer_id: myId }, { status: ["WAITING"] }],
      },
    });
    if (targetBill) {
      console.log("a", targetBill.status)
      await targetBill.update({ status: "CANCEL" });
      console.log("b", targetBill)
      res.send({ message: "sucess" });
    } else {
      res.send({ message: "provider accecpted" });
    }
  } catch (error) {
    res.send(error);
  }
};

/* =============  Provider Bill =============*/

const getProviderBills = async (req, res) => {
  try {
    const myId = req.user.id;
    console.log("this is the ", myId)
    const targetBill = await db.Bills.findAll({
      where: { provider_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["id", "customer_id", "startDate", "endDate", "status"],
      raw: true,
    });

    if (!targetBill) {
      res.status(404).send({ message: `Not Found bill ID: ${id}` });
    } else {
      const billToCustomers = await
        targetBill.map((customer) => {
          return db.Customers.findAll({
            where: { id: customer.customer_id },
            attributes: ["name", "lastName", "phoneNumber", "status"],
            raw: true,
          });
        });

      const billToPet = await targetBill.map((bill) => {
        return bill.id;
      });

      const targetPetBills = await db.PetsBills.findAll({
        where: { bill_id: billToPet },
        attributes: ["pet_id"],
        raw: true,
      });

      const targetPet = await
        targetPetBills.map(async (ele, idx) => {
          return await db.Pets.findAll({
            where: { id: [ele.pet_id] },
            attributes: [
              "name",
              "breedType",
              "weight",
              "sex",
              "certificate",
              "image",
              "other",
            ],
            raw: true,
          });
        })

      res.send({ targetBill, billToCustomers, targetPet });
    }
  } catch (error) {
    res.send(error);
  }
};

const UpdateProviderBIlls = async (req, res) => {
  const { status } = req.body;
  try {
    const { bId } = req.params;
    const myId = req.user.id;

    const targetBill = await db.Bills.findOne({
      where: {
        [Op.and]: [{ id: bId }, { provider_id: myId }, { status: status }],
      },
    });
    if (targetBill) {
      await targetBill.update({ status: status });
      res.send({ message: "provider accecpted" });
    } else {
      res.send({ message: "provider accecpted" });
    }
    4;
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getCustomerBills,
  CreateCustomerBills,
  UpdateCustomerBIlls,

  getProviderBills,
  UpdateProviderBIlls,
};
