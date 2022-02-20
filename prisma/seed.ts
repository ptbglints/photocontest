import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const { Role } = require('@prisma/client')

const userName = [
    'admin',
    'mod',
    'judge',
    'arman',
    'jhony',
    'alice',
    'bob'
]
const email = [
    'admin@ptb1.io',
    'moderator@ptb1.io',
    'judge@ptb1.io',
    'arman@maulana.com',
    'jhony@kawasaki.com',
    'alice@prisma.io',
    'bobby@prisma.io'
]
const password = [
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
    '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O'
]
const role = [
    Role.ADMIN,
    Role.MODERATOR,
    Role.JUDGE,
    Role.USER,
    Role.USER,
    Role.USER,
    Role.USER,
]
const name = [
    'admin',
    'mod',
    'judge',
    'arman',
    'jhony',
    'alice',
    'bobby'
]
async function main() {
    for (let i = 0; i < userName.length; i++) {
        const result = await prisma.user.upsert({
            where: { userName: userName[i] },
            update: {},
            create: {
                userName: userName[i],
                email: email[i],
                password: password[i],
                role: role[i],
                profile: {
                    create: {
                        name: name[i]
                    }
                }
            },
        });
        console.log(`Created user: ${result.userName}`, '\tpassword: Pass123?')
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
