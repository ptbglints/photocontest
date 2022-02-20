# PHOTOCONTEST BACKEND SERVER

### installation
```bash
npm install
```

### Seeding / populating data
If you are developing against local database, simpli execute this command:

`npx prisma migrage dev --name init`

If you are developing against a cloud-based database (for example, on Heroku) and are currently prototyping such that you don't care about generated migration files and only need to apply your Prisma data model to the database schema, you can run:

`npx prisma db push && npx prisma db seed`

Initial data will be as follows:

#### Users

Password are all the same: `Pass123?`

```json
// GET /api/users

{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@ptb1.io",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "ADMIN",
      "createdat": "2022-02-12T18:06:26.147Z"
    },
    {
      "id": 2,
      "username": "moderator",
      "email": "moderator@ptb1.io",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "MODERATOR",
      "createdat": "2022-02-12T18:06:28.101Z"
    },
    {
      "id": 3,
      "username": "judge",
      "email": "judge@ptb1.io",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "JUDGE",
      "createdat": "2022-02-12T18:06:28.900Z"
    },
    {
      "id": 4,
      "username": "arman",
      "email": "arman@maulana.com",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "USER",
      "createdat": "2022-02-12T18:06:29.644Z"
    },
    {
      "id": 5,
      "username": "jhonyboy",
      "email": "jhony@kawasaki.com",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "USER",
      "createdat": "2022-02-12T18:06:30.258Z"
    },
    {
      "id": 6,
      "username": "alice",
      "email": "alice@prisma.io",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "USER",
      "createdat": "2022-02-12T18:06:31.186Z"
    },
    {
      "id": 7,
      "username": "bobprisma",
      "email": "bob@prisma.io",
      "password": "$2a$10$71IM5uVMR5KE1skbUySVM.6ONjZ9wj1Rxq08FNRQjXiJSykqR445O",
      "role": "USER",
      "createdat": "2022-02-12T18:06:31.903Z"
    },
    {
      "id": 8,
      "username": "jokox",
      "email": "jkx@mantab.io",
      "password": "$2a$10$eai6TYCL9nI2vpBvyk/79Ot8k.e7RtGRpyAZuGo4SSZutWs.j5v.G",
      "role": "USER",
      "createdat": "2022-02-12T18:32:35.261Z"
    }
  ]
}
```

All users password are the same: `Pass1123?`

#### Folder structure
```
├── app.js
├── controllers
|  ├── api
|  |  ├── albums
|  |  |  └── index.js
|  |  ├── photos
|  |  |  └── index.js
|  |  └── users
|  |     ├── index.js
|  |     ├── login
|  |     |  └── index.js
|  |     ├── password
|  |     |  └── index.js
|  |     ├── profile
|  |     |  └── index.js
|  |     └── signup
|  |        └── index.js
|  └── apiv2
|     ├── profiles
|     |  └── index.js
|     └── users
|        └── index.js
├── docker-compose.yml
├── example.env
├── index.html
├── middleware
|  ├── authChangePassword.js
|  ├── authJwt.js
|  ├── authRole.js
|  ├── authUpdateProfile.js
|  ├── cache.js
|  ├── errorHandler.js
|  ├── modifyImagePath.js
|  ├── responseSuccess.js
|  └── uploadPhoto.js
├── model
|  └── index.js
├── new.tree
├── nodemon.json
├── out.txt
├── package-lock.json
├── package.json
├── permission
|  └── index.js
├── prisma
|  ├── schema.prisma
|  └── seed.ts
├── public
|  └── README.md
├── README.md
├── swagger.example.yml
├── swagger.yml
├── thunder-collection_PhotoContest.json
├── thunder-collection_User_API.json
├── thunder-environment_Heroku.json
├── thunder-environment_Local.json
└── utils
   ├── bcrypt.js
   ├── index.js
   ├── jsonwebtoken.js
   └── validator.js
```