const {Keyboard} = require('vk-io')

const promocodesPannelKeyboard = Keyboard.builder()
    .textButton({
        label: 'Добавить промокод',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/add-promocode'
        }
    }).row()
    .textButton({
        label: 'Удалить промокод',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/delete-promocode'
        }
    }).inline()

module.exports = promocodesPannelKeyboard