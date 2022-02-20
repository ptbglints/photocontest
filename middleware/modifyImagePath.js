function modifyImagePath(req,res,next) {
    const resultObj = req.result
    // check if the incoming data is array, e.g. from prisma.getMany
    if(Array.isArray(resultObj) && resultObj.length > 0){
        // console.log('is Array')
        for ( let i = 0; i < resultObj.length; i++){            
            const modifiedPath = `${req.protocol}://${req.headers.host}/${resultObj[i].path}`
            resultObj[i].path = modifiedPath
        }
    }
    // If not an array, then it must be an object.
    // Check for empty object
    else if (Object.keys(resultObj).length > 0){
        // console.log('resultObj must be an Object')
        const modifiedPath = `${req.protocol}://${req.headers.host}/${resultObj.path}`
        resultObj.path = modifiedPath
    }

    //  here the path inside resultObj has been modified
    req.result = resultObj
    next()
}

function modifyImagePath2ndLayer(req,res,next) {
    const resultObj = req.result.photos
    // check if the incoming data is array, e.g. from prisma.getMany
    if(Array.isArray(resultObj) && resultObj.length > 0){
        // console.log('is Array')
        for ( let i = 0; i < resultObj.length; i++){            
            const modifiedPath = `${req.protocol}://${req.headers.host}/${resultObj[i].path}`
            resultObj[i].path = modifiedPath
        }
    }
    // If not an array, then it must be an object.
    // Check for empty object
    else if (Object.keys(resultObj).length > 0){
        // console.log('resultObj must be an Object')
        const modifiedPath = `${req.protocol}://${req.headers.host}/${resultObj.path}`
        resultObj.path = modifiedPath
    }

    //  here the path inside resultObj has been modified
    req.result = resultObj
    next()
}

module.exports ={
    modifyImagePath,
    modifyImagePath2ndLayer
}