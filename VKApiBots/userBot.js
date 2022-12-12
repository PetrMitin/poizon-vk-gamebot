const {HearManager} = require('@vk-io/hear')
const startKeyboard = require('../keyboards/userKeyboards/startKeyboard')
const keyService = require('../services/keyService')

const userBot = new HearManager()

userBot.hear('пойз', async (context) => {
    if (context.isOutbox) return
    keyService.addToUserKeys(context.senderId, 'common', 30)
    keyService.addToUserKeys(context.senderId, 'epic', 30)
    keyService.addToUserKeys(context.senderId, 'legendary', 30)
    return context.send(`Приветствуем! Чтобы использовать игрового бота, откройте клавиатуру (квадрат с 4 точками справа от смайликов)`, {
        keyboard: startKeyboard
    })
})

userBot.hear(new RegExp('Мои ключи'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('list-keys')
})

userBot.hear(new RegExp('Крутить ключ'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('spin-keys')
})

userBot.hear(new RegExp('Обменять ключи на более редкие'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('exchange-keys')
})

userBot.hear(new RegExp('Активировать промокод'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('activate-promocode')
})

module.exports = userBot