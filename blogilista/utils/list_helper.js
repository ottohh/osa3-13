const lodash = require("lodash")
const blog = require("../models/blog")
const dummy = (blogs) => {
    
    
    return 1
  }
const totalLikes =(blogs)=>{
    
    return blogs.reduce((sum,current)=>sum+current.likes,0)

}

const favoriteBlog=(blogs)=>{
    let favorite = blogs.find((blog)=>blog.likes===Math.max(...blogs.map((blog)=>blog.likes)))
    return favorite===undefined?{}:favorite

}

const mostBlogs=(blogs)=>{
    if(blogs.length===0)return {}
    let authorsAndBlogCount =lodash.countBy(blogs,"author")
    let authorWithMostBlogs =Object.keys(authorsAndBlogCount).reduce((prev,current)=>authorsAndBlogCount[prev]>authorsAndBlogCount[current]?prev:current)
    return {author:authorWithMostBlogs,blogs:authorsAndBlogCount[authorWithMostBlogs]}

}

const mostLikes=(blogs)=>{
    if(blogs.length===0)return {}

    let authorAndLikes = {}

    blogs.forEach((blog)=>{
        if(blog.author in authorAndLikes){
            authorAndLikes[blog.author]+=blog.likes
        }else{
            authorAndLikes[blog.author]=blog.likes
        }

    })

    let authorWithMostLikes =Object.keys(authorAndLikes).reduce((prev,current)=>authorAndLikes[prev]>authorAndLikes[current]?prev:current)
    return {author:authorWithMostLikes,likes:authorAndLikes[authorWithMostLikes]}


}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }