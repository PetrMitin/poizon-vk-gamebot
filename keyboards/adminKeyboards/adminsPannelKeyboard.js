const {Keyboard} = require('vk-io')

const adminsPannelKeyboard = Keyboard.builder()
    .textButton({
        label: 'Добавить админа',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/add-admin'
        }
    }).row()
    .textButton({
        label: 'Удалить админа',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/delete-admin'
        }
    }).inline()

module.exports = adminsPannelKeyboard