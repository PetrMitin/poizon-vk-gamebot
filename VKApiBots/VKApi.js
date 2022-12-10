const {VK} = require('vk-io')
const {User} = require('../db/models')
const {SessionManager} = require('@vk-io/session')
const sceneManager = require('../scenes/sceneManager')
const adminBot = require('./adminBot')
const userBot = require('./userBot')
const KeyService = require('../services/keyService')

const token = process.env.VK_API_TOKEN
const vkInstance = new VK({
    token,
    apiLimit: 3,
    apiMode: 'sequential'
})

const sessionManager = new SessionManager()

setInterval(async () => {
    const currTime = new Date()
    if (currTime.getHours() === 20 && currTime.getMinutes() <= 59) {
        const users = (await User.findAll()).sort((val1, val2) => val1.dataValues.amountOfMessages - val2.dataValues.amountOfMessages).map(val => val.dataValues.id)
        const topThree = users.slice(-1)
        topThree.forEach(async userId => {
            return await KeyService.addToUserKeys(userId, 'legendary', 3)
        })
        await vkInstance.api.messages.send({
            peer_ids: topThree,
            random_id: 0,
            message: 'You have a new key!'
        })
    }
}, 30 * 1000)

vkInstance.updates.on(`message_new`, sessionManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middleware);
vkInstance.updates.on(`message_new`, sceneManager.middlewareIntercept);
vkInstance.updates.on(`message_new`, adminBot.middleware);
vkInstance.updates.on(`message_new`, userBot.middleware);

module.exports = vkInstance