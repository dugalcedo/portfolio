import dotenv from 'dotenv'
dotenv.config()
const {DBURI} = process.env

import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(DBURI, {
    logging: false
})

const {
    STRING,
    INTEGER
} = DataTypes

const PRIMARY_KEY =  {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
}

const avatars = [
    'deer', 'dog', 'cat', 'gorilla', 'fish', 'rabbit', 'bird', 'lion', 'tiger', 'horse', 'dragon', 'goat', 'sheep', 'shark', 'bear', 'polarbear', 'fox', 'seal', 'parrot', 'vulture', 'penguin', 'eagle', 'pig', 'ape', 'elephant', 'hippo', 'rhino', 'panda', 'rat', 'raccoon', 'kangaroo', 'koala', 'dolphin', 'orc', 'unicorn'
]

export const User = sequelize.define('user', {
    id: PRIMARY_KEY,
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, Infinity]
        }
    },
    password: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false
    },
    avatar: {
        type: STRING,
        defaultValue: 'deer',
        validate: {
            isAvailable(val) {
                if (!avatars.includes(val)) {
                    throw new Error('Invalid avatar')
                }
            }
        }
    }
}, {
    timestamps: true
})

export const Post = sequelize.define('post', {
    id: PRIMARY_KEY,
    userId: {
        type: INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    content: {
        type: STRING,
        allowNull: false,
        validate: {
            len: [1, 300]
        }
    }
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