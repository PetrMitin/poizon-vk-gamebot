require('dotenv').config()
const sequelize = require('./db/db')
const models = require('./db/models')
const vkInstance = require('./VKApiBots/VKApi')

const start = async () => {
    await sequelize.authenticate()
    await sequelize.sync()
    await vkInstance.updates.startPolling()
    console.log(`VK GameBot is listening to your events`)
}

start()