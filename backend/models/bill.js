module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Bills", {
        startDate: {
            type: DataTypes.DATE,
            // allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            // allowNull: false
        },
        status: {
            type: DataTypes.ENUM("WAITING", "ACCEPT", "REJECT", "CONFIRM", "CANCEL", "ONTIME", "PROGRESS", "ENDING", "COMPLETE")
        }
    })

    model.associate = models => {
        model.hasOne(models.Reviews, { foreignKey: 'bill_id' })
        model.hasMany(models.PetsBills, { foreignKey: 'bill_id' })
        model.hasMany(models.BillOptionalServices, { foreignKey: 'bill_id' })
        model.belongsTo(models.Providers, { foreignKey: 'provider_id' })
        model.belongsTo(models.Customers, { foreignKey: "customer_id" })
    }

    return model;
}