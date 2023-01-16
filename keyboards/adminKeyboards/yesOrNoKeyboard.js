const {Keyboard} = require('vk-io')

const yesOrNoKeyboard = Keyboard.builder()
    .textButton({
        label: 'Да, рассылаем',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            command: '/confirm-send'
        }
    }).row()
    .textButton({
        label: 'Нет, не рассылаем',
        color: Keyboard.SECONDARY_COLOR,
        payload: {
            command: '/cancel-send'
        }
    }).inline()

module.exports = yesOrNoKeyboard