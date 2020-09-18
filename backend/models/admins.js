module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("Admins", {
        username: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        isAdmin: {
            type: DataTypes.ENUM('TRUE', 'FALSE'),
            defaultValue: 'TRUE'
        }
    })

    return model
}