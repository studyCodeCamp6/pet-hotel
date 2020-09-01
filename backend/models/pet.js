module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Pets", {
        name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        breedType: {
            type: DataTypes.ENUM("CAT", "DOG")
        },
        weight: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        sex: {
            type: DataTypes.ENUM("male", "female")
        },
        certificate: {
            type: DataTypes.STRING(1200)
        },
        image: {
            type: DataTypes.STRING(1200)
        },
        other: {
            type: DataTypes.STRING(5000)
        }
    })

    model.associate = models => {
        model.belongsTo(models.Customers, { foreignKey: "customer_id" })
        model.hasMany(models.PetsBills, { foreignKey: "pet_id" })
        model.hasMany(models.PetImages, { foreignKey: "pet_id" })
    }

    return model;
}