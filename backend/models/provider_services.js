module.exports = (sequelize) => {
    const model = sequelize.define("ProviderOptionalServices")
    
    model.associate = models => {
        model.belongsTo(models.Providers, {foreignKey: "provider_id"})
        model.belongsTo(models.OptionalServices, { foreignKey: "service_id" })
    }
    
    return model
}