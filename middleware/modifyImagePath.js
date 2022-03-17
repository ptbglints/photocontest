function modifyImagePath(req, res, next) {
    try {
        const resultObj = req.result
        const objKey = 'path'
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            // console.log('is Array')        
            for (let i = 0; i < resultObj.length; i++) {
                let photoPath = resultObj[i][objKey]
                if (photoPath !== null && !photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    resultObj[i][objKey] = modifiedPath
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            // console.log('resultObj must be an Object')
            let photoPath = resultObj[objKey]
            if (photoPath !== null && !photoPath.match(/http/i)) {
                const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                resultObj[objKey] = modifiedPath
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
            for (let i = 0; i < resultObj.length; i++) {
                let photoPath = resultObj[i].path
                if (photoPath !== null && !photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    resultObj[i].path = modifiedPath
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            let photoPath = resultObj.path
            if (photoPath !== null && !photoPath.match(/http/i)) {
                const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                resultObj.path = modifiedPath
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
        const objKey = 'profilePhoto'
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            // console.log('is Array')                   
            for (let i = 0; i < resultObj.length; i++) {
                if (resultObj[i][objKey]) {
                    let photoPath = resultObj[i][objKey]
                    if (photoPath !== null && !photoPath.match(/http/i)) {
                        const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                        resultObj[i][objKey] = modifiedPath
                    }
                }
            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            // console.log('resultObj must be an Object')
            if (resultObj[objKey]) {
                let photoPath = resultObj[objKey]
                if (photoPath !== null && !photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    resultObj[objKey] = modifiedPath
                }
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
        const resultObj = req.result
        // check if the incoming data is array, e.g. from prisma.getMany
        if (Array.isArray(resultObj) && resultObj.length > 0) {
            for (let i = 0; i < resultObj.length; i++) {
                let photoPath;
                if (resultObj[i].profile) {
                    photoPath = resultObj[i].profile.profilePhoto
                    console.log(photoPath)
                } else if (resultObj[i].profilePhoto) {
                    photoPath = resultObj[i].profilePhoto
                }
                if (photoPath && !photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    resultObj[i]['profile']['profilePhoto'] = modifiedPath
                }

            }
        }
        // If not an array, then it must be an object.
        // Check for empty object
        else if (Object.keys(resultObj).length > 0) {
            if (resultObj && resultObj.profilePhoto) {
                let photoPath = resultObj.profilePhoto
                if (!photoPath.match(/http/i)) {
                    const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
                    req.result['profilePhoto'] = modifiedPath
                }
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