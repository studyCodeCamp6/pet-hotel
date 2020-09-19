const { Op } = require("sequelize");
const db = require("../models");

/* =============  Customer Histories =============*/

const getCustomerHistories = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetBill = await db.Pets.findAll({
      where: { customer_id: myId },
      attributes: ['name', 'breedType'],
      include: {
        model: db.PetsBills,
        attributes: ["cost"],
        include: {
          model: db.Bills,
          attributes: ["startDate", "endDate"],
          order: [["startDate", "DESC"]],
          include: {
            model: db.Providers,
            attributes: ['hotelName', 'address'],
            include: {
              model : db.ProviderOptionalServices,
              include : {
                model : db.OptionalServices,
                attributes : ["name"]
              }
            }
          }
        }
      }

    });

    const result = targetBill.map(item => {

      const petName = item.name

      const petBreed = item.breedType

      const costPet = item.PetsBills.map(costs => {
        return costs.cost
      })

      const dateBill = item.PetsBills.map(bill => {
        return bill.Bill
      })
      const stDate = dateBill.map(date => date.startDate)
      const enDate = dateBill.map(date => date.endDate)

      const providerInfo = dateBill.map(bill => {
        return bill.Provider
      })

      const providerInfo_Name = providerInfo.map(info => info.hotelName)
      const providerInfo_Address = providerInfo.map(info => info.address)

      const dayTotal = (enDate[0] - stDate[0]) / (1000 * 24 * 60 * 60)

      const serviceProvider = providerInfo.map(serV => 
        { const services = serV.ProviderOptionalServices.map(service => {
          return service.OptionalService.name
        })
        return services
      })
      const serviceProvider_split = serviceProvider.join(',')



      return {
        petName,
        petBreed,
        cost: costPet * dayTotal,
        startDate: stDate[0],
        endDate: enDate[0],
        hotelName: providerInfo_Name,
        address: providerInfo_Address,
        service : serviceProvider_split

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
