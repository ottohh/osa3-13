const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type:String,required:true},
    author: String,
    url: {type:String,required:true},
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      
      if(!("likes" in returnedObject))returnedObject.likes=0
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)
  
  
  