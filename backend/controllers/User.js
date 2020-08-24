const db = require('../models')

const register = async (req, res) => {
    const { username, password, name } = req.body
    const targetUser = await db.User.findOne({ where: { username } })

    if (targetUser) {
        res.status(400).send({ message: "Username already used" })
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUND))
        const hashedPW = bc.hashSync(password, salt)

        await db.User.create({
            password: hashedPW,
            username,
            name,
            lastName,
            phoneNumber,
            email,
            wallet_id,
            wallet,
            status
        })

        res.status(201).send({ message: "User created" })
    }
}

module.exports = {
    register
}