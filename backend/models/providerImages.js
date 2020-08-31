module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('ProviderImages', {
        image: {
            type: DataTypes.STRING(1200)
        }
    })
    
    model.associate = models => {
        model.belongsTo(models.Providers, {foreignKey: "provider_id"})
    }
    
    return model
}