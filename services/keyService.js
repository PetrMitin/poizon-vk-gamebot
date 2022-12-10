const {User} = require('../db/models')

class KeyService {
    addToUserKeys  = async (userId, keyTier, keyAmount) => {
        try {
            const oldUser = await User.findByPk(userId)
            if (!oldUser) throw new Error('User to add keys not found')
            switch (keyTier) {
                case 'common':
                    return (await User.update({
                        commonKeysAmount: oldUser.dataValues.commonKeysAmount + keyAmount
                    }, {where: {id: oldUser.dataValues.id}, returning: true}))[1].dataValues
                case 'epic': 
                    return (await User.update({
                        epicKeysAmount: oldUser.dataValues.epicKeysAmount + keyAmount
                    }, {where: {id: oldUser.dataValues.id}, returning: true}))[1].dataValues
                case 'legendary':
                    return (await User.update({
                        legendaryKeysAmount: oldUser.dataValues.legendaryKeysAmount + keyAmount
                    }, {where: {id: oldUser.dataValues.id}, returning: true}))[1].dataValues
                default:
                    return null
            }
        } catch (e) {
            console.log(e);
        }
    }

    exchangeUserKeys = async (userId, keyTier) => {
        try {
            const oldUser = await User.findByPk(userId)
            if (!oldUser) throw new Error('User to exchange keys not found')
        } catch (e) {
            console.log(e)
        }
    }

    spinUserKey = async (userId, keyTier) => {
        try {
            const oldUser = await User.findByPk(userId)
            if (!oldUser) throw new Error('User to spin keys not found')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new KeyService()