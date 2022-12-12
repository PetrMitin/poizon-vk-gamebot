const {User} = require('../db/models')
const {keyRewards} = require('../utils/consts/keyConsts')

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

    listUserKeys = async (userId, keyTier) => {
        try {
            const oldUser = await User.findByPk(userId)
            if (!oldUser) throw new Error('User to exchange keys not found')
            const {commonKeysAmount, epicKeysAmount, legendaryKeysAmount} = oldUser.dataValues
            return {commonKeysAmount, epicKeysAmount, legendaryKeysAmount}
        } catch (e) {
            console.log(e)
        }
    }

    exchangeUserKeys = async (userId, keyTier) => {
        try {
            const oldUser = await User.findByPk(userId)
            if (!oldUser) throw new Error('User to exchange keys not found')
            const {commonKeysAmount, epicKeysAmount, legendaryKeysAmount} = oldUser.dataValues
            console.log(commonKeysAmount, epicKeysAmount, legendaryKeysAmount, 'exchange');
            if (keyTier === 'common') {
                if (commonKeysAmount < 12) return null
                await User.update({commonKeysAmount: commonKeysAmount - 12, epicKeysAmount: epicKeysAmount + 1}, {where: {id: oldUser.dataValues.id}})
                return 1
            } else if (keyTier === 'epic') {
                if (epicKeysAmount < 3) return null
                await User.update({epicKeysAmount: epicKeysAmount - 3, legendaryKeysAmount: legendaryKeysAmount + 1}, {where: {id: oldUser.dataValues.id}})
                return 1
            } else {
                return null
            }
        } catch (e) {
            console.log(e)
        }
    }

    spinUserKey = async (userId, keyTier) => {
        try {
            const oldUser = await User.findByPk(userId)
            if (!oldUser) throw new Error('User to spin keys not found')
            const {commonKeysAmount, epicKeysAmount, legendaryKeysAmount} = oldUser.dataValues
            let currSpinnedPercent = 0
            const random = Math.random() * 100
            console.log(keyTier, random);
            if (keyTier === 'common') {
                if (!commonKeysAmount) return {reward: 'У вас нет обычных ключей!'}
                await User.update({commonKeysAmount: commonKeysAmount - 1}, {where: {id: oldUser.dataValues.id}})
                const rewards = keyRewards.common
                for (let i = 0; i < rewards.length; i++) {
                    const reward = rewards[i]
                    if (currSpinnedPercent <= random &&  random < currSpinnedPercent + reward.chance) return reward
                    currSpinnedPercent += reward.chance
                }
            } else if (keyTier === 'epic') {
                if (!epicKeysAmount) return {reward: 'У вас нет эпических ключей!'}
                await User.update({epicKeysAmount: epicKeysAmount - 1}, {where: {id: oldUser.dataValues.id}})
                const rewards = keyRewards.epic
                for (let i = 0; i < rewards.length; i++) {
                    const reward = rewards[i]
                    if (currSpinnedPercent <= random &&  random < currSpinnedPercent + reward.chance) return reward
                    currSpinnedPercent += reward.chance
                }
            } else if (keyTier === 'legendary') {
                if (!legendaryKeysAmount) return {reward: 'У вас нет легендарных ключей!'}
                await User.update({legendaryKeysAmount: legendaryKeysAmount - 1}, {where: {id: oldUser.dataValues.id}})
                const rewards = keyRewards.legendary
                for (let i = 0; i < rewards.length; i++) {
                    const reward = rewards[i]
                    if (currSpinnedPercent <= random &&  random < currSpinnedPercent + reward.chance) return reward
                    currSpinnedPercent += reward.chance
                }
            } else {
                return null
            }
            return {reward: 'nothing'}
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

module.exports = new KeyService()