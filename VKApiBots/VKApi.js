const {VK} = require('vk-io')
const {User} = require('../db/models')
const {SessionManager} = require('@vk-io/session')
const sceneManager = require('../scenes/sceneManager')
const adminBot = require('./adminBot')
const userBot = require('./userBot')
const KeyService = require('../services/keyService')
const UserService = require('../services/userService')
const { isAdmin } = require('../utils/functions/validators')

const token = process.env.VK_API_TOKEN
const vkInstance = new VK({
    token,
    apiLimit: 3,
    apiMode: 'sequential'
})

const sessionManager = new SessionManager()

setInterval(async () => {
    const currTime = new Date()
    if (currTime.getHours() === 23) {
        const users = (await User.findAll()).map(val => val.dataValues).sort((val1, val2) => val1.amountOfMessages - val2.amountOfMessages)
        const topThree = users.slice(-3).filter(elem => elem.amountOfMessages >= 30)
        topThree.forEach(async userData => {
            return await KeyService.addToUserKeys(userData.id, 'common', 1)
        })
        const topIds = topThree.map(data => data.id)
        await User.update({amountOfMessages: 0}, {where: {}})
        if (!topIds.length) return
        return await vkInstance.api.messages.send({
            peer_ids: topIds,
            random_id: 0,
            message: 'Поздравляем! За актив в беседе вы получаете обычный ключ! \nЧтобы крутить его, нажмите кнопку "Использовать ключ" на интерактивной клавиатуре в беседе группы'
        })
    }
}, 60 * 60 * 1000)

vkInstance.updates.on(`message_new`, async (message, next) => {
    if (message.isOutbox) return
    if (message.peerType !== 'user') return next()
    const senderId = message.senderId
    const oldUser = await User.findByPk(senderId)
    if (oldUser) {
        await UserService.incrementUserMessages(senderId)
    } else {
        await UserService.addUser(senderId, 'user')
    }
    return next()
});
vkInstance.updates.on(`message_new`, sessionManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middlewareIntercept);
vkInstance.updates.on(`message_new`, userBot.middleware);
vkInstance.updates.on(`message_new`, async (message, next) => {
    const isUserAdmin = await isAdmin(parseInt(message.senderId))
    if (!isUserAdmin || message.peerType !== 'user') return 
    return next()
});
vkInstance.updates.on(`message_new`, adminBot.middleware);

module.exports = vkInstance