module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Reviews', {
        comment: {
          type : DataTypes.STRING(5000)
        },
        score: {
          type: DataTypes.INTEGER
      }  
    })
    
    model.associate = models => {
      model.belongsTo(models.Providers, { foreignKey: 'provider_id' })
      model.belongsTo(models.Bills, {foreignKey: 'bill_id'})
    }
    
    return model
}