import dotenv from 'dotenv'
dotenv.config()
const {DBURI} = process.env

import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(DBURI, {
    logging: false
})

export const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, Infinity]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {

})

export async function connect(then) {
    try {
        const connection = await sequelize.sync({ alter: true })
        console.log(`
Connected to database.
        `)
        then(connection)
    } catch (error) {
        console.log(`
Failed connecting to database.
        `, error)
    }
}

export default sequelize