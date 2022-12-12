const { Promocode, User } = require("../db/models");
const keyService = require("./keyService");

class PromocodeService {
    async createPromocode(text) {
        try {
            const oldPromocode = await Promocode.findByPk(text)
            if (oldPromocode) return null
            return (await Promocode.create({text}, {returning: true})).dataValues
        } catch(e) {
            console.log(e);
        }
    }

    async activatePromocode(userId, text) {
        try {
            const oldPromocode = await Promocode.findByPk(text)
            const oldUser = await User.findByPk(userId)
            if (!oldPromocode || !oldUser || oldPromocode.dataValues.isActivated) return null
            await keyService.addToUserKeys(userId, 'common', 1)
            return (await Promocode.update({isActivated: true}, {where: {text}, returning: true}))
        } catch(e) {
            console.log(e);
        }
    } 

    async deletePromocode(text) {
        try {
            const oldPromocode = await Promocode.findByPk(text)
            if (!oldPromocode) return null
            await Promocode.destroy({where: {text}})
            return true
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new PromocodeService()