const { StepScene } = require("@vk-io/scenes");
const { keysSelectKeyboard } = require("../keyboards/userKeyboards/keysSelectKeyboard");
const yesOrNoKeyboard = require('../keyboards/adminKeyboards/yesOrNoKeyboard')
const adminService = require("../services/adminService");
const keyService = require("../services/keyService");
const promocodeService = require("../services/promocodeService");

const addPromocodeScene = new StepScene('add-promocode', [
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введите текст промокода')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.text = context.text
        return context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        const text = context.scene.state.text
        const result = await promocodeService.createPromocode(text)
        if (result === null) {
            await context.send('Такой промокод уже существует!')
        } else if (result === undefined) {
            await context.send('Произошла непредвиденная ошибка...')
        } else {
            await context.send('Поздравляем, промокод был создан!')
        }
        return context.scene.leave()
    }
])

const deletePromocodeScene = new StepScene('delete-promocode', [
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введите текст промокода для удаления')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.text = context.text
        return context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        const text = context.scene.state.text
        const result = await promocodeService.deletePromocode(text)
        if (result === null) {
            await context.send('Такого промокода не существует!')
        } else if (result === undefined) {
            await context.send('Произошла непредвиденная ошибка...')
        } else {
            await context.send('Поздравляем, промокод был удален!')
        }
        return context.scene.leave()
    }
])

const addKeysToUserScene = new StepScene('add-keys-to-user', [
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введите id пользователя, которому нужно добавить ключи')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.userId = context.text
        return context.scene.step.next()
    },
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Какой тип ключа нужно добавить?', {
                keyboard: keysSelectKeyboard
            })
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.keyTier = context.messagePayload.command
        return context.scene.step.next()
    },
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Сколько таких ключей нужно добавить?')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.numberOfKeys = parseInt(context.text)
        return context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        const {userId, keyTier, numberOfKeys} = context.scene.state
        const result = await keyService.addToUserKeys(userId, keyTier, numberOfKeys)
        if (result) {
            await context.send('Ключи успешно добавлены!')
        } else {
            await context.send('Что-то пошло не так...')
        }
        return context.scene.leave()
    }
])

const addAdminScene = new StepScene('add-admin', [
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введите id нового админа')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.newAdminId = context.text
        return context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        const newAdminId = context.scene.state.newAdminId
        const result = await adminService.createAdmin(newAdminId)
        if (result === undefined) {
            await context.send('Произошла непредвиденная ошибка...')
        } else {
            await context.send('Поздравляем, админ был создан!')
        }
        return context.scene.leave()
    }
])

const deleteAdminScene = new StepScene('delete-admin', [
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введите id админа для удаления')
        } else if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        context.scene.state.adminId = context.text
        return context.scene.step.next()
    },
    async (context) => {
        if (!context.scene.step.firstTime && (!context.text || context.isOutbox)) {
            return
        }
        const adminId = context.scene.state.adminId
        const result = await adminService.deleteAdmin(adminId)
        if (result === null) {
            await context.send('Такого админа и в глаза не видали!')
        } else if (result === undefined) {
            await context.send('Произошла непредвиденная ошибка...')
        } else {
            await context.send('Поздравляем, админ был удален!')
        }
        return context.scene.leave()
    }
])

const sendNotificationsScene = new StepScene('send-chat-notifications', [
    async (context) => {
        console.log(context);
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Введи текст рассылки')
        }  else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const notificationText = context.text
        const attachments = context.attachments.map(elem => `photo${elem.ownerId}_${elem.id}`)
        console.log(notificationText, attachments);
        context.scene.state.notificationText = notificationText
        context.scene.state.attachments = attachments
        return context.scene.step.next()
        
    }, 
    async (context) => {
        if (context.scene.step.firstTime || !context.text) {
            return context.send('Рассылаем?', {
                keyboard: yesOrNoKeyboard
            })
        }  else if (!context.scene.step.firstTime && !context.text) {
            return
        }
        if (context.isOutbox) return
        const notificationConfirmation = context.messagePayload.command === '/confirm-send'
        if (!notificationConfirmation) {
            await context.send('Отменяем')
            return await context.scene.leave()
        }
        return context.scene.step.next()
    },
    async (context) => {
        if (context.scene.step.firstTime) {
            const notificationText = context.scene.state.notificationText
            const attachments = context.scene.state.attachments
            await adminService.sendChatNotification(notificationText, attachments)
        }
        return await context.scene.leave()
    }
])

const adminScenes = [addPromocodeScene, deletePromocodeScene, addKeysToUserScene, addAdminScene, deleteAdminScene, sendNotificationsScene]

module.exports = adminScenes