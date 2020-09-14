const { Op } = require("sequelize");
const db = require("../models");

/* =============  Customer Bill =============*/

const getCustomerBills = async (req, res) => {
  try {
    const myId = req.user.id;
    console.log("this is the ", myId)
    const targetBill = await db.Customers.findAll({
      where: { id: myId },
      attributes: ['id'],
      include: {
        model: db.Pets,
        attributes: ['name', 'breedType'],
        include: {
          model: db.PetsBills,
          include: {
            model: db.Bills,
            attributes: ["startDate", "endDate"],
            order: [["startDate", "DESC"]],
            include: {
              model: db.Providers,
              attributes: ['hotelName', 'address']
            }
          }
        }
      }
    });

    const result = targetBill.map(item => {
      const pets = item.Pets.map(pet => {
        return pet.name
      })
      const pets_split = pets.join(" , ")

      const petsBreed = item.Pets.map(petBreed => {
        return petBreed.breedType
      })
      const petsBreed_split = petsBreed.join(" , ")

      const hotelInfo = item.Pets.map(data => {
        const hotelInfo_PetBills = data.PetsBills.map(bill => { return bill.Bill.Provider.hotelName }
        )
        return hotelInfo_PetBills[0]
      })
      const hotelName_bill = hotelInfo.reduce((a, b) => (a === b) ? [a] : NaN)
      console.log("address => ", hotelInfo)

      const hotelAddress = item.Pets.map(data => {
        const hotelInfo_PetBills = data.PetsBills.map(bill => { return bill.Bill.Provider.address }
        )
        return hotelInfo_PetBills[0]
      })
      const hotelAddress_bill = hotelAddress.reduce((a, b) => (a === b) ? [a] : NaN)

      const stDate = item.Pets.map(data => {
        const stDate_PetBills = data.PetsBills.map(bill => {
          return bill.Bill.startDate
        })
        return stDate_PetBills[0]
      })
      const stDate_sum = stDate.reduce((a, b) => (a.getTime() == b.getTime()) ? a : NaN)

      const enDate = item.Pets.map(data => {
        const enDate_PetBills = data.PetsBills.map(bill => {
          return bill.Bill.endDate
        })
        return enDate_PetBills[0]
      })
      const enDate_sum = enDate.reduce((a, b) => (a.getTime() == b.getTime()) ? a : NaN)

      console.log("enDate => ", enDate)

      return {
        pets_split, petsBreed_split, hotelName_bill, hotelAddress_bill,
        startDate: stDate_sum, endDate: enDate_sum
      }
    })


    res.send({ result });

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
    // console.log("this is the ", myId)
    const targetBill = await db.Bills.findAll({
      where: { provider_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["id", "provider_id", "startDate", "endDate", "status"],
      include: {
        model: db.PetsBills,
        include: {
          model: db.Pets,
          attributes: [
            "name",
            "breedType",
          ],
          include: {
            model: db.Customers,
            attributes: ["name", "lastName", "phoneNumber", "status"],
          }
        }
      }
    });

    const result = targetBill.map(item => {
      const customer = item.PetsBills.map(petBill => {
        return petBill.Pet.Customer.name
      })
      const customerName = customer.reduce((a, b) => (a == b) ? [a] : NaN)
      // console.log("customer =>",customerName)

      const petsData = item.PetsBills.map(petsBill => {
        return petsBill.Pet.name
      })
      const pets_data = petsData.join(',')

      const petsBreed = item.PetsBills.map(petsBill => {
        return petsBill.Pet.breedType
      })
      const pets_Breed = petsBreed.join(',')

      console.log("petsData =>", petsData)

      return { startDate: item.startDate, endDate: item.endDate, customerName, pets_data, pets_Breed }
    })
    res.send({ result });

  }
  catch (error) {
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
