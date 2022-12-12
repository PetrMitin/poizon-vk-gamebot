const {Keyboard} = require('vk-io')

const keysSelectKeyboard = Keyboard.builder()
    .textButton({
        label: 'Обычный',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: 'common'
        }
    }).row()
    .textButton({
        label: 'Эпический',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: 'epic'
        }
    }).row()
    .textButton({
        label: 'Легендарный',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: 'legendary'
        }
    }).inline()

const shortKeysSelectKeyboard = Keyboard.builder()
    .textButton({
        label: 'Обычныe',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: 'common'
        }
    }).row()
    .textButton({
        label: 'Эпические',
        color: Keyboard.PRIMARY_COLOR,
        payload: {
            command: 'epic'
        }
    }).inline()

module.exports = {keysSelectKeyboard, shortKeysSelectKeyboard}