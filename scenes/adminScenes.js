const { StepScene } = require("@vk-io/scenes");
const adminService = require("../services/adminService");
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

const adminScenes = [addPromocodeScene, deletePromocodeScene, addAdminScene, deleteAdminScene]

module.exports = adminScenes