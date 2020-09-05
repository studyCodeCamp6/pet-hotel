module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("PetsBills", {
        cost : {
            type: DataTypes.INTEGER
        }
    })

    model.associate = models => {
        model.belongsTo(models.Pets, { foreignKey: "pet_id" })
        model.belongsTo(models.Bills, { foreignKey: "bill_id" })
    }

    return model
}