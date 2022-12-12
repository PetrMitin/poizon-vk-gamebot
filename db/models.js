const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.BIGINT, primaryKey: true},
    role: {type: DataTypes.STRING, defaultValue: 'user'},
    amountOfMessages: {type: DataTypes.INTEGER, defaultValue: 1},
    commonKeysAmount: {type: DataTypes.INTEGER, defaultValue: 0},
    epicKeysAmount: {type: DataTypes.INTEGER, defaultValue: 0},
    legendaryKeysAmount: {type: DataTypes.INTEGER, defaultValue: 0},
}, {hooks: true})

const Promocode = sequelize.define('promocode', {
    text: {type: DataTypes.STRING, primaryKey: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false}
})

module.exports = {
    User,
    Promocode
}