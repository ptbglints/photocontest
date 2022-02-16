import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@ptb1.io',
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            role: 'ADMIN',
            profile: {
                create: {
                    name: 'admin'
                }
            }
        },
    });

    const moderator = await prisma.user.upsert({
        where: { username: 'moderator' },
        update: {},
        create: {
            username: 'moderator',
            email: 'moderator@ptb1.io',
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            role: 'MODERATOR',
            profile: {
                create: {
                    name: 'moderator'
                }
            }
        }
    });

    const judge = await prisma.user.upsert({
        where: { username: 'judge' },
        update: {},
        create: {
            username: 'judge',
            email: 'judge@ptb1.io',
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            role: 'JUDGE',
            profile: {
                create: {
                    name: 'judge'
                }
            }
        },
    });

    const arman = await prisma.user.upsert({
        where: { username: 'arman' },
        update: {},
        create: {
            username: 'arman',
            email: 'arman@maulana.com',
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            profile: {
                create: {
                    name: 'arman'
                }
            }
        },
    });

    const jhonyboy = await prisma.user.upsert({
        where: { username: 'jhonyboy' },
        update: {},
        create: {
            username: 'jhonyboy',
            email: 'jhony@kawasaki.com',
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            profile: {
                create: {
                    name: 'jhonyboy'
                }
            }
        },
    });

    const alice = await prisma.user.upsert({
        where: { email: "alice@prisma.io" },
        update: {},
        create: {
            username: 'alice',
            email: "alice@prisma.io",
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            profile: {
                create: {
                    name: 'alice'
                }
            }
        },
    });

    const bob = await prisma.user.upsert({
        where: { email: "bob@prisma.io" },
        update: {},
        create: {
            username: 'bobprisma',
            email: "bob@prisma.io",
            password: '$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O',
            profile: {
                create: {
                    name: 'bobprisma'
                }
            }
        },
    });

    console.log({ admin, moderator, judge, arman, jhonyboy, alice, bob });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
