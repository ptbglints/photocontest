function modifyImagePath(req,res,next) {
    // const resultObj = req.result
    // if(resultObj.isArray){
    //     for ( let i = 0; i < resultObj.length; i++){
            
    //     }
    // }else{

    // }
    const imageUrl = `${req.protocol}://${req.headers.host}${resultObj.path}`
    resultObj.path = imageUrl
    req.result = resultObj
    next()
}

module.exports ={
    modifyImagePath
}