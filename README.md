# PHOTOCONTEST BACKEND SERVER

### installation
```bash
npm install
```
#### Folder structure
```
├── api (router directory)
│   └── users
│       ├── login
│       │   └── index.js
│       ├── profile
│       │   └── index.js
│       └── signup
│           └── index.js
├── midleware (middleware directory, khusus menyimpan fungsi midleware)
│   └── index.js
├── public (public directory, khusus menyimpan file yang berhubungan dengan aplikasi)
│   └── README.md
├── prisma
│   ├── migrations (migrasi database)
│   │   ├── 20220203142011_init
│   │   │   └── migration.sql
│   │   ├── 20220203144200_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma (model dan schema database)
└── utils (utils directory, khusus menyimpan fungsi utilitas)
│    └── index.js
├── app.js
├── README.md
├── package.json
├── package-lock.json
```