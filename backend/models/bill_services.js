module.exports = (sequelize) => {
    const model = sequelize.define("BillOptionalServices")
    
    model.associate = models => {
        model.belongsTo(models.Bills, {foreignKey: "bill_id"})
        model.belongsTo(models.OptionalServices, { foreignKey: "service_id" })
    }
    
    return model
}