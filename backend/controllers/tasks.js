const { Op } = require("sequelize");
const db = require("../models");
const moment = require("moment");
const momentTimezone = require("moment-timezone");
const { utc } = require("moment");
const { sequelize } = require("../models");

/* =============  Customer Bill =============*/

const getCustomerBills = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Bills.findAll({
      where: { customer_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["id", "provider_id", "startDate", "endDate", "status"],
      include: [
        {
          model: db.Providers,
          attributes: [
            "hotelName",
            "phoneNumber",
            "email",
            "area",
            "wage",
            "type",
            "image",
            "address",
            "status",
            "isOpen",
          ],
        },
        {
          model: db.PetsBills,
          include: {
            model: db.Pets,
            attributes: [
              "name",
              "breedType",
              "weight",
              "sex",
              "certificate",
              "image",
              "other",
            ],
          },
        },
      ],
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
        [Op.and]: [{ id: bId }, { customer_id: myId }],
      },
    });
    if (targetBill) {
      console.log("here", req.body.status);
      await targetBill.update({ status: req.body.status });
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
    const targetBill = await db.Bills.findAll({
      where: {
        provider_id: myId,
        [Op.not]: [{ status: ["ENDING", "COMPLETE"] }],
      },
      order: [["startDate", "DESC"]],
      attributes: ["id", "startDate", "endDate", "status"],
      include: [
        {
          model: db.PetsBills,
          include: {
            model: db.Pets,
            attributes: [
              "name",
              "breedType",
              "weight",
              "sex",
              "certificate",
              "image",
              "other",
              "customer_id",
            ],
            include: {
              model: db.Customers,
              attributes: [
                "id",
                "name",
                "lastName",
                "phoneNumber",
                "email",
                "status",
                "image",
              ],
            },
          },
        },
      ],
    });

    if (!targetBill) {
      res.status(404).send({ message: `Not Found bill ID: ${id}` });
    } else {
      let proposedDate = moment().format("YYYY-MM-DDTHH:mm");
      for (let i = 0; i < targetBill.length; i++) {
        if (targetBill[i].status == "CONFIRM") {
          const startDateDatabase = (JSON.stringify(targetBill[i].startDate)).slice(1, -1)
          const endDateDatabase = (JSON.stringify(targetBill[i].endDate)).slice(1, -1)
          if (startDateDatabase < proposedDate) {
            await targetBill[i].update({ status: "ONTIME" });
          } else if (endDateDatabase < proposedDate) {
            await targetBill[i].update({ status: "ENDING" });
          }
        }
      }
      res.status(200).send({ targetBill });
    }
  } catch (error) {
    res.send(error);
  }
};

const UpdateProviderBIlls = async (req, res) => {
  console.log("a")
  const { status } = req.body;
  try {
    const { bId } = req.params;
    const myId = req.user.id;

    const targetBill = await db.Bills.findOne({
      where: {
        [Op.and]: [{ id: bId }, { provider_id: myId }],
      },
    });
    if (targetBill) {
      await targetBill.update({ status });
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
