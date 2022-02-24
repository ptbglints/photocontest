const { User, Album, prisma } = require('../../../../model')
const { verifyJWT } = require('../../../../middleware/authJwt');
const { randomUUID } = require('crypto');
const { ValidateCreateAlbum, CheckValidatorResult, createAlbumSchema } = require('../../../../middleware/validator');
const { modifyImagePath2ndLayer } = require('../../../../middleware/modifyImagePath');


// Get single album from every user
// Currently, there is no way to join tables together
// We have to resort to raw queries
// https://github.com/prisma/prisma/issues/5184
const testing = async (req, res, next) => {
    try {
        let { skip, take } = req.query
        skip = parseInt(skip)
        take = parseInt(take)

        const result = await prisma.$queryRaw
        `
        SELECT
        album.id as "albumId", "updatedAt",
        title, description, path, album."userId",
        name, address, "profilePhoto", "coverPhoto"
        FROM "Album" as album
        INNER JOIN
        (select "userId", max("updatedAt") as bob from "Album" group by "userId") AS latest
        ON album."updatedAt" = latest."bob"
        INNER JOIN
        (select "userId", name, address, "profilePhoto", "coverPhoto" from "Profile") AS profile
        ON album."userId" = profile."userId"
        INNER JOIN
        (select "Photo".id, path from "Photo") AS photo
        ON album."coverPhotoId" = photo.id
        ORDER BY album."updatedAt" DESC
        OFFSET ${skip} LIMIT ${take};
        `

        req.result = result
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = routes => {
    routes.get('/test',
        testing
    )
}
