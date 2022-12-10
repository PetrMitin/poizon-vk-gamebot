const {User} = require('../db/models')

class UserService {
    addUser = async (userId, role) => {
        try {
            const newUser = (await User.create({id: userId, role, amountOfMessages: 1}, {returning: true})).dataValues
            return newUser
        } catch (e) {
            console.log(e)
        }
    }

    incrementUserMessages = async (userId) => {
        try {
            const user = await User.findByPk(userId)
            const updatedUser = (await User.update({
                amountOfMessages: user.dataValues.amountOfMessages + 1
            }, {
                where: {id: user.dataValues.id}, 
                returning: true
            }))[1].dataValues
            return updatedUser
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserService()