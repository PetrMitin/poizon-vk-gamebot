const {HearManager} = require('@vk-io/hear')
const startKeyboard = require('../keyboards/userKeyboards/startKeyboard')

const userBot = new HearManager()

userBot.hear('пойз', (context) => {
    return context.send(`Приветствуем! Чтобы использовать игрового бота, откройте клавиатуру (квадрат с 4 точками справа от смайликов)`, {
        keyboard: startKeyboard
    })
})

userBot.hear(new RegExp('Мои ключи'), async (context) => {
    return await context.scene.enter('list-keys')
})

userBot.hear(new RegExp('Крутить ключ'), async (context) => {
    return await context.scene.enter('spin-keys')
})

userBot.hear(new RegExp('Обменять ключи на более редкие'), async (context) => {
    return await context.scene.enter('exchange-keys')
})

userBot.hear(new RegExp('Активировать промокод'), async (context) => {
    return await context.scene.enter('activate-promocode')
})

module.exports = userBot