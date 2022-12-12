const {SceneManager} = require('@vk-io/scenes')
const adminScenes = require('./adminScenes')
const userScenes = require('./userScenes')

const sceneManager = new SceneManager()

sceneManager.addScenes(adminScenes)
sceneManager.addScenes(userScenes)

module.exports = sceneManager