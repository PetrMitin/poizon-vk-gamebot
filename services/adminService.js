const {VK} = require('vk-io')
const { User } = require("../db/models")
const userService = require("./userService")

class AdminService {
    token = process.env.VK_API_TOKEN
    vkInstance = new VK({
        token: this.token,
        apiLimit: 3,
        apiMode: 'sequential'
    })

    async isAdmin(id) {
        try {
            const data = (await User.findByPk(id)).dataValues
            return data.role === 'admin' || parseInt(id) === parseInt(process.env.INITIAL_ADMIN_ID)
        } catch(e) {
            console.log(e);
        }
    }

    async createAdmin(newAdminId) {
        try {
            const oldAdmin = await User.findByPk(newAdminId)
            if (oldAdmin) {
                return (await User.update({role: 'admin'}, {where: {id: newAdminId}, returning: true}))
            } else {
                return await userService.addUser(newAdminId, 'admin')
            }
        } catch(e) {
            console.log(e);
        }
    }

    async deleteAdmin(adminId) {
        try {
            const oldAdmin = await User.findByPk(adminId)
            if (!oldAdmin) return null
            return (await User.update({role: 'user'}, {where: {id: adminId}, returning: true}))
        } catch(e) {
            console.log(e);
        }
    }

    async sendChatNotification(text) {
        const userIds = (await User.findAll()).map(elem => parseInt(elem.dataValues.id))
        return await this.vkInstance.api.messages.send({
            peer_ids: userIds,
            random_id: 0,
            message: text
        })
    }
}

module.exports = new AdminService()