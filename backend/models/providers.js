module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Providers", {
        hotelName: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        phoneNumber: {
            type: DataTypes.INTEGER(10),
            // allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        optionalService: {
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
            type: DataTypes.ENUM("CAT", "DOG", "CATANDDOG"),
            defaultValue: "CAT"
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
        }
    })

    model.associate = models => {
        model.belongsToMany(models.Customers, { through: models.Bills, as: "To", foreignKey: "provider_id" })
        model.belongsTo(models.Customers, { foreignKey: "customer_id" })
    }

    return model
}