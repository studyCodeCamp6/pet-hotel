module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('PetImages', {
        image: {
            type: DataTypes.STRING(1200)
        }
    })
    
    model.associate = models => {
        model.belongsTo(models.Pets, {foreignKey: 'pet_id'})
    }
    
    return model
}