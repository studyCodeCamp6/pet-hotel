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
      raw: true,
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

      let billToPet = await Promise.all(
        targetBill.map(async (bill) => {
          return await db.PetsBills.findAll({
            where: { bill_id: [bill.id] },
            attributes: ["pet_id", "bill_id"],
            raw: true,
            include:{model:db.Pets,attributes:["name","breedType"]}
          });
        })
      );
      console.log(targetBill, billToCustomers,billToPet)

      res.send({ targetBill, billToCustomers,billToPet});
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
        [Op.and]: [{ id: bId }, { customer_id: myId }, { status: "WAITING" }],
      },
    });
    if (targetBill) {
      await targetBill.update({ status: "CANCLE" });
      // console.log(bId, "billID");
      res.send({ message: "provider accecpted" });
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
    const targetBill = await db.Bills.findAll({
      where: { provider_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["id", "customer_id", "startDate", "endDate", "status"],
      raw: true,
    });

    if (!targetBill) {
      res.status(404).send({ message: `Not Found bill ID: ${id}` });
    } else {
      const billToCustomers = await Promise.all(
        targetBill.map((customer) => {
          return db.Customers.findAll({
            where: { id: customer.customer_id },
            attributes: ["name", "lastName", "phoneNumber", "status"],
            raw: true,
          });
        })
      );

      const billToPet = await targetBill.map((bill) => {
        return bill.id;
      });

      const targetPetBills = await db.PetsBills.findAll({
        where: { bill_id: billToPet },
        attributes: ["pet_id"],
        raw: true,
      });

      const targetPet = await Promise.all(
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
      );
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
