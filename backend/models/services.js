module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("OptionalServices", {
        name: {
            type: DataTypes.STRING,
            // allowNull:false
        }
    })
    
    model.associate = models => {
        model.hasMany(models.BillOptionalServices, { foreignKey: "service_id" })
        model.hasMany(models.ProviderOptionalServices, {foreignKey: "service_id"})
    }
    
    return model
}