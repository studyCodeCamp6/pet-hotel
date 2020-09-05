module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Providers", {
        hotelName: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(10),
            // allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        area: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        wage: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        type: {
            type: DataTypes.ENUM("CAT", "DOG", "CATANDDOG")
        },
        address: {
            type: DataTypes.STRING(1200)
        },
        image: {
            type: DataTypes.STRING(1200)
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        isOpen: {
            type: DataTypes.ENUM("OPEN", "CLOSE"),
            defaultValue: "OPEN"
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        isProvider: {
            type: DataTypes.ENUM("TRUE", "FALSE"),
            defaultValue: "FALSE"
        }
    })

    model.associate = models => {
        model.hasMany(models.Bills, { foreignKey: "provider_id" })
        model.hasMany(models.ProviderOptionalServices, { foreignKey: "provider_id" })
        model.hasMany(models.ProviderImages, { foreignKey: "provider_id" })
        model.hasMany(models.Reviews, { foreignKey: "provider_id" })
        model.belongsTo(models.Customers, { foreignKey: "customer_id" })
    }

    return model
}