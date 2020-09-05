const { Op } = require("sequelize");
const db = require("../models");

/* =============  Customer Histories =============*/

const getCustomerHistories = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Bills.findAll({
      where: {
        [Op.and]: [{ customer_id: myId }, {status:"COMPLETE"}],
      },
      order: [["startDate", "DESC"]],
      attributes: [
        "provider_id",
        "startDate",
        "endDate",
        "optionalServices",
        "status",
      ],
    });
    if (!targetBill) {
      res.status(404).send({ message: `You have no History` });
    } else {
      res.send(targetBill);
    }
  } catch (error) {
    res.send(error);
  }
};

/* =============  Provider Histories =============*/

const getProviderHistories = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Bills.findOne({
      where: {
        [Op.and]: [{ provider_id: myId }, {status:"COMPLETE"}],
      },
      order: [["startDate", "DESC"]],
      attributes: ["provider_id", "startDate", "endDate", "optionalServices"],
    });
    if (!targetBill) {
      res.status(404).send({ message: `You have no History` });
    } else {
      res.send(targetBill);
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  getCustomerHistories,
  getProviderHistories,
};
