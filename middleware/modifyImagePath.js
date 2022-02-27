function modifyImagePath(req, res, next) {
    const resultObj = req.result
    // check if the incoming data is array, e.g. from prisma.getMany
    if (Array.isArray(resultObj) && resultObj.length > 0) {
        // console.log('is Array')        
        for (let i = 0; i < resultObj.length; i++) {
            let photoPath = resultObj[i].path
            if (!photoPath.match(/picsum.photos/i) && !photoPath.match(/randomuser.me/i)) {
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
        if (!photoPath.match(/picsum.photos/i) && !photoPath.match(/randomuser.me/i)) {
            const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
            photoPath = modifiedPath
        }
    }
    //  here the path inside resultObj has been modified
    req.result = resultObj
    next()
}

function modifyImagePath2ndLayer(req, res, next) {
    const resultObj = req.result.photos
    // check if the incoming data is array, e.g. from prisma.getMany
    if (Array.isArray(resultObj) && resultObj.length > 0) {
        let photoPath = resultObj[0].path
        if (!photoPath.match(/picsum.photos/i) && !photoPath.match(/randomuser.me/i)) {
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
        if (!photoPath.match(/picsum.photos/i) && !photoPath.match(/randomuser.me/i)) {
            const modifiedPath = `${req.protocol}://${req.headers.host}/${photoPath}`
            photoPath = modifiedPath
        }
    }
    //  here the path inside resultObj has been modified
    req.result.photos = resultObj
    next()
}

module.exports = {
    modifyImagePath,
    modifyImagePath2ndLayer
}