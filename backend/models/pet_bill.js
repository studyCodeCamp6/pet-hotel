module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("PetsBills")
    
    model.associate = models => {
        model.belongsTo(models.Pets, {foreignKey: "pet_id"})
        model.belongsTo(models.Bills, {foreignKey: "bill_id"})
    }
    
    return model
}