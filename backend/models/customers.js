module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Customers', {
        name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        lastName: {
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
        username: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING(1200)
        },
        isCustomer: {
            type: DataTypes.ENUM("TRUE", "FALSE")
        }
    })

    model.associate = models => {
        model.hasMany(models.Pets, { foreignKey: "customer_id" })
        model.hasMany(models.Bills, {foreignKey: "customer_id"})
        model.hasOne(models.Providers, { foreignKey: "customer_id" })
    }

    return model;
}