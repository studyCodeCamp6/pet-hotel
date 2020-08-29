const { Op } = require("sequelize");
const db = require("../models");

/* =============  Customer Bill =============*/

const getCustomerBills = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Bills.findOne({
      where: { customer_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["provider_id","startDate", "endDate", "optionalServices", "status"],
    });
    if (!targetBill) {
      res.status(404).send({ message: `Not Found bill ID: ${id}` });
    } else {
      res.send(targetBill);
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
      console.log(bId, "billID");
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
    const targetBill = await db.Bills.findOne({
      where: { customer_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["customer_id","startDate", "endDate", "optionalServices", "status"],
    });
    if (!targetBill) {
      res.status(404).send({ message: `Not Found bill ID: ${id}` });
    } else {
      res.send(targetBill);
    }
  } catch (error) {
    res.send(error);
  }
};

const UpdateProviderBIlls = async (req, res) => {
  const {status} = req.body
  try {
    const { bId } = req.params;
    const myId = req.user.id;

    const targetBill = await db.Bills.findOne({
      where: {
        [Op.and]: [{ id: bId }, {provider_id: myId }, { status:status}],
      },
    });
    if (targetBill) {
      await targetBill.update({ status:status});
      console.log(bId, "billID");
      res.send({ message: "provider accecpted" });
    } else {
      res.send({ message: "provider accecpted" });
    }4
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getCustomerBills,
  CreateCustomerBills,
  UpdateCustomerBIlls,

  getProviderBills,
  UpdateProviderBIlls
};
