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
        wallet_id: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true
        },
        wallet: {
            type: DataTypes.INTEGER
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
            type: DataTypes.ENUM("CAT", "DOG", "CAT&DOG")
        },
        homeNumber: {
            type: DataTypes.STRING(10),
            // allowNull: false
        },
        moo: {
            type: DataTypes.STRING
        },
        lane: {
            type: DataTypes.STRING
        },
        subDistrict: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            // allowNull:false
        },
        zipCode: {
            type: DataTypes.INTEGER
        }
    })

    model.associate = models => {
        model.belongsToMany(models.Customers, { through: models.Bills, as: "To", foreignKey: "provider_id" })
    }

    return model
}