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
        }
    })
    
    model.associate = models => {
        model.belongsToMany(models.Providers, {through: models.Bills, as: "To", foreignKey: "customer_id"})
    }
    
    return model;
}