const { User } = require("../../db/models")

const isAdmin = async (userId) => {
    return (userId === parseInt(process.env.INITIAL_ADMIN_ID)) || ((await User.findByPk(userId)).dataValues.role === 'admin')
}

module.exports = {
    isAdmin
}