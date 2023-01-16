const {Keyboard} = require('vk-io')

const adminPannelKeyboard = Keyboard.builder()
    .textButton({
        label: 'Промокоды',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/promocodes'
        }
    }).row()
    .textButton({
        label: 'Ключи',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/keys'
        }
    }).row()
    .textButton({
        label: 'Уведомление для участников беседы',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/notification'
        }
    }).row()
    .textButton({
        label: 'Админы',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/admins'
        }
    }).inline()

module.exports = adminPannelKeyboard