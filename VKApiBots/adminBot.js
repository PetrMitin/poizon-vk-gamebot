const {HearManager} = require('@vk-io/hear')
const adminPannelKeyboard = require('../keyboards/adminKeyboards/adminPannelKeyboard')
const adminsPannelKeyboard = require('../keyboards/adminKeyboards/adminsPannelKeyboard')
const promocodesPannelKeyboard = require('../keyboards/adminKeyboards/promocodesPannelKeyboard')

const adminBot = new HearManager()

adminBot.hear(new RegExp('/pzgamesadmin'), async (context) => {
    if (context.isOutbox) return
    return context.send('Чё надо по геймботу?', {
        keyboard: adminPannelKeyboard
    })
})

adminBot.hear(new RegExp('Промокоды'), async (context) => {
    if (context.isOutbox) return
    return context.send('Чё надо по промокодам?', {
        keyboard: promocodesPannelKeyboard
    })
})

adminBot.hear(new RegExp('Добавить промокод'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('add-promocode')
})

adminBot.hear(new RegExp('Удалить промокод'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('delete-promocode')
})

adminBot.hear(new RegExp('Админы'), async (context) => {
    if (context.isOutbox) return
    return context.send('Чё надо по админам?', {
        keyboard: adminsPannelKeyboard
    })
})

adminBot.hear(new RegExp('Добавить админа'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('add-admin')
})

adminBot.hear(new RegExp('Удалить админа'), async (context) => {
    if (context.isOutbox) return
    return context.scene.enter('delete-admin')
})

module.exports = adminBot