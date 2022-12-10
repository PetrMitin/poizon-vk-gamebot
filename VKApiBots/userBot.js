const {HearManager} = require('@vk-io/hear')
const {User} = require('../db/models')
const UserService = require('../services/userService')

const userBot = new HearManager()

userBot.hear(new RegExp(''), async (context) => {
    const senderId = context.senderId
    const oldUser = await User.findByPk(senderId)
    if (oldUser) {
        await UserService.incrementUserMessages(senderId)
    } else {
        await UserService.addUser(senderId, 'user')
    }
})

module.exports = userBot