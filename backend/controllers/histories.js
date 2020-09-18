const { Op } = require("sequelize");
const db = require("../models");

/* =============  Customer Histories =============*/

const getCustomerHistories = async (req, res) => {
  try {
    const myId = req.user.id;
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
  };
}

/* =============  Provider Histories =============*/

const getProviderHistories = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Bills.findAll({
      where: { provider_id: myId },
      order: [["startDate", "DESC"]],
      attributes: ["id", "provider_id", "startDate", "endDate", "status"],
      include: {
        model: db.PetsBills,
        attributes: ["cost"],
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

    const targetService = await db.Bills.findAll({
      where: { provider_id: myId },
      attributes: ["id"],
      include: {
        model: db.BillOptionalServices,
        include: {
          model: db.OptionalServices,
          attributes: ["name"]
        }
      }
    })

    const result = targetBill.map(item => {
      const customer = item.PetsBills.map(petBill => {
        return petBill.Pet.Customer.name
      })

      const customerName = customer.reduce((a, b) => (a == b) ? [a] : NaN)
      const petsData = item.PetsBills.map(petsBill => {
        return petsBill.Pet.name
      })
      const pets_data = petsData.join(',')
      const petsBreed = item.PetsBills.map(petsBill => {
        return petsBill.Pet.breedType
      })
      const pets_Breed = petsBreed.join(',')

      const opService = targetService.map(ser => {
        const targetSer = ser.BillOptionalServices.map(serV => {
          return serV.OptionalService.name
        })
        return targetSer
      })
      const opServices = opService.join(',')

      const costTotal = item.PetsBills.map(money => {
        return money.cost
      })

      const dayTotal = (item.endDate - item.startDate) / (1000 * 24 * 60 * 60)
      return {
        startDate: item.startDate,
        endDate: item.endDate,
        customerName,
        pets_data,
        pets_Breed,
        cost: (costTotal.reduce((a, b) => (a + b))) * dayTotal,
        service: opServices

      }
    })
    res.send({ result });

  }
  catch (error) {
    res.send(error);
  }

};
module.exports = {
  getCustomerHistories,
  getProviderHistories,
};
