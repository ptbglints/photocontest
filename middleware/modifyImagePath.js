function modifyImagePath(req, res, next) {
    try {
        const resultObj = req.result
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            // console.log('is Array')        
            for (let i = 0; i < resultObj.length; i++) {
                let photoPath = resultObj[i].path
                if (photoPath !== null && !photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    photoPath = modifiedPath
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            // console.log('resultObj must be an Object')
            let photoPath = resultObj.path
            if (photoPath !== null && !photoPath.match(/http/i)) {
                const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                photoPath = modifiedPath
            }
        }
        //  here the path inside resultObj has been modified
        req.result = resultObj
        next()
    } catch (err) {
        err.name = 'Error modifyImagePath'
        throw err
    }

}

function modifyImagePath2ndLayer(req, res, next) {
    try {
        const resultObj = req.result.photos
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            let photoPath = resultObj[0].path
            if (photoPath !== null && !photoPath.match(/http/i)) {
                for (let i = 0; i < resultObj.length; i++) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    photoPath = modifiedPath
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            let photoPath = resultObj.path
            if (photoPath !== null && !photoPath.match(/http/i)) {
                const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                photoPath = modifiedPath
            }
        }
        //  here the path inside resultObj has been modified
        req.result.photos = resultObj
        next()
    } catch (err) {
        err.name = 'Error modifyImagePath2ndLayer'
        throw err
    }

}

function modifyProfilePhotoPath(req, res, next) {
    try {
        const resultObj = req.result
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            // console.log('is Array')        
            for (let i = 0; i < resultObj.length; i++) {
                let photoPath = resultObj[i].profilePhoto
                // console.log(photoPath)
                if (photoPath !== null && !photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    photoPath = modifiedPath
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            // console.log('resultObj must be an Object')
            let photoPath = resultObj.profilePhoto
            if (photoPath !== null && !photoPath.match(/http/i)) {
                const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                photoPath = modifiedPath
            }
        }
        //  here the path inside resultObj has been modified
        req.result = resultObj
        next()
    } catch (err) {
        err.name = 'Error modifyProfilePhotoPath'
        throw err
    }

}

function modifyProfilePhotoPath2ndLayer(req, res, next) {
    try {
        const resultObj = req.result.profile
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            let photoPath = resultObj[0].profilePhoto
            if (!photoPath.match(/http/i)) {
                for (let i = 0; i < resultObj.length; i++) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    photoPath = modifiedPath
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            let photoPath = resultObj.profilePhoto
            if (!photoPath.match(/http/i)) {
                const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                photoPath = modifiedPath
            }
        }
        //  here the path inside resultObj has been modified
        req.result.photos = resultObj
        next()
    } catch (err) {
        err.name = 'Error modifyProfilePhotoPath2ndLayer'
        throw err
    }

}

module.exports = {
    modifyImagePath,
    modifyImagePath2ndLayer,
    modifyProfilePhotoPath,
    modifyProfilePhotoPath2ndLayer
}