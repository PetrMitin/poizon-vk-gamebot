const { StepScene } = require("@vk-io/scenes");
const {keysSelectKeyboard, shortKeysSelectKeyboard} = require("../keyboards/userKeyboards/keysSelectKeyboard");
const keyService = require("../services/keyService");
const promocodeService = require("../services/promocodeService");

const listKeysScene = new StepScene('list-keys', [
    async (context) => {
        const {commonKeysAmount, epicKeysAmount, legendaryKeysAmount} = await keyService.listUserKeys(context.senderId, 'common')
        await context.send(`Обычных ключей: ${commonKeysAmount} шт. \nЭпических ключей: ${epicKeysAmount} шт. \nЛегендарных ключей: ${legendaryKeysAmount} шт.`)
        return context.scene.leave()
    }
])

const spinKeysScene = new StepScene('spin-keys', [
    async (context) => {
        if (context.scene.step.firstTime) {
            return context.send('Какой ключ вы хотите использовать?', {
                keyboard: keysSelectKeyboard
            })
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.keyTier = context.messagePayload.command
        return await context.scene.step.next()
    }, 
    async (context) => {
        if (!context.scene.step.firstTime || context.scene.state.isSpinned) return
        const keyTier = context.scene.state?.keyTier || 'common'
        const reward = await keyService.spinUserKey(context.senderId, keyTier)
        context.scene.state.isSpinned = true
        if (!reward) {
            await context.send('Произошла непредвиденная ошибка...')
            return context.scene.leave()
        }
        if (reward.reward === 'nothing') {
            await context.send('К сожалению, вам ничего не выпало! Попробуйте еще раз!')
        } else if (reward.reward === 'Эпический ключ') {
            await keyService.addToUserKeys(context.senderId, 'epic', 1)
            await context.send(`Поздравляем! \nВаша награда: ${reward.reward}. \nОн уже добавлен к вашим ключам!`)
        } else if (reward.reward === 'Легендарный ключ') {
            await keyService.addToUserKeys(context.senderId, 'legendary', 1)
            await context.send(`Поздравляем! \nВаша награда: ${reward.reward}. \nОн уже добавлен к вашим ключам!`)
        } else if (reward.reward === 'У вас нет обычных ключей!' || reward.reward === 'У вас нет эпических ключей!' || reward.reward === 'У вас нет легендарных ключей!') {
            await context.send(`${reward.reward}`)
        } else {
            await context.send(`Поздравляем! \nВаша награда: ${reward.reward}. \nДля её получения перешлите данное сообщение менеджеру!`)
        }
        return await context.scene.leave()
    }
])

const exchangeKeysScene = new StepScene('exchange-keys', [
    async (context) => {
        if (context.scene.step.firstTime) {
            return context.send('Какие ключи вы хотите обменять?', {
                keyboard: shortKeysSelectKeyboard
            })
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.keyTier = context.messagePayload.command
        return await context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime || context.scene.state.isNotFirstTime) return
        const keyTier = context.scene.state?.keyTier || 'common'
        const result  = await keyService.exchangeUserKeys(context.senderId, keyTier)
        context.scene.state.isNotFirstTime = true
        if (!result) {
            await context.send('Недостаточно ключей для обмена!')
        } else  {
            await context.send('Ваши ключи успешно обменяны!')
        }
        return await context.scene.leave()
    }
])

const activatePromocodeScene = new StepScene('activate-promocode', [
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введите промокод')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.userPromocode = context.text
        return context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        const text = context.scene.state.userPromocode
        const result = await promocodeService.activatePromocode(context.senderId, text)
        if (result === null) {
            await context.send('Такого промокода не существует либо он уже был активирован!')
        } else if (result === undefined) {
            await context.send('Произошла непредвиденная ошибка...')
        } else {
            await context.send('Поздравляем, ваш промокод активирован! Обычный ключ был добавлен в ваш инвентарь!')
        }
        return context.scene.leave()
    }
])

const userScenes = [listKeysScene, spinKeysScene, exchangeKeysScene, activatePromocodeScene]

module.exports = userScenes