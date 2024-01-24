import {
    prismaClient
} from "../src/application/database.js";

import bcrypt from "bcrypt"
const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "evan"
        }
    });
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'evan',
            password: await bcrypt.hash('rahasia', 10),
            name: 'alexander evan',
            token: 'test'
        }
    });
}

export {
    removeTestUser,
    createTestUser
}