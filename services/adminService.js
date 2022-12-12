const { User } = require("../db/models")
const userService = require("./userService")

class AdminService {
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
}

module.exports = new AdminService()