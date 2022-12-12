const {Keyboard} = require('vk-io')

const startKeyboard = Keyboard.builder()
    .textButton({
        label: 'Мои ключи',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/list-keys'
        }
    }).row()
    .textButton({
        label: 'Крутить ключ',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/spin-keys'
        }
    }).row()
    .textButton({
        label: 'Обменять ключи на более редкие',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/exchange-keys'
        }
    }).row()
    .textButton({
        label: 'Активировать промокод',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: '/activate-promocode'
        }
    })

module.exports = startKeyboard