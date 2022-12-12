const {Keyboard} = require('vk-io')

const keysPannelKeyboard = Keyboard.builder()
    .textButton({
        label: 'Добавить ключи пользователю',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/add-keys-to-user'
        }
    }).inline()

module.exports = keysPannelKeyboard