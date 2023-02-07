
const tokenExtractor = (request, response, next) => {
    // tokenin ekstraktoiva koodi
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token= authorization.replace('Bearer ', '')
    }else{
        request.token=null
    }
    
    next()
  }


module.exports=tokenExtractor