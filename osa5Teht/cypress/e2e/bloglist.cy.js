Cypress.Commands.add('createBlog', ( title, url,author ) => {
  cy.request({
    url: '/api/blogs',
    method: 'POST',
    body: { title, url,author },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('')
})


describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', '/api/testing/reset')
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })



  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('otto')
      cy.get('input:last').type('otto')
      cy.contains('login').click()
      cy.contains('successful')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('otto')
      cy.get('input:last').type('otto2')
      cy.contains('login').click()
      cy.contains('wrong')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', '/api/login', {
        username: 'otto', password: 'otto'
      }).then(response => {

        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        console.log(JSON.stringify(response.body))
        cy.visit('')
      })
      console.log(localStorage)
      cy.createBlog("otto","dsa","asd")




    })

    it('A blog can be created', function() {
      cy.contains('Create new').click()
      cy.get('input:first').type('otto23232')
      cy.get('input[type="author"]').type('ottewq')
      cy.get('input:last').type('otto2')
      cy.get(".create").click()
      cy.visit('')
      cy.contains('otto23232')
    })

    it('A blog can be liked', function() {
      cy.contains("view").click()
      cy.contains("Like").click()
      cy.contains("Likes:1")
     
    })



    it('A blog can be removed', function() {
    
      cy.contains("view").click()
      cy.contains("remove").click()
      cy.get('html').should('not.contain', 'otto')
     
    })
  })

  describe("wrong user",function() {
    beforeEach(function() {
      cy.request('POST', '/api/login', {
        username: 'otto', password: 'otto'
      }).then(response => {

        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        console.log(JSON.stringify(response.body))
        cy.visit('')
      })
      console.log(localStorage)
      cy.createBlog("otto","dsa","asd")

    })


    it("wrong user should not see remove buttons",function(){
      cy.request('POST', '/api/users', {
        username: 'otto1', password: 'otto',name:"otto"
      })
      
      cy.request('POST', '/api/login', {
        username: 'otto1', password: 'otto'
      }).then(response => {
  
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        console.log(JSON.stringify(response.body))
      

        cy.visit('')

        
      })
      cy.visit('')
      cy.get(".blog").eq(0).should("not.contain","remove")
      
      
    })
   
  })

  it("Blogs arranged by likes",function(){
    
    cy.request('POST', '/api/login', {
      username: 'otto', password: 'otto'
    }).then(response => {

      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      console.log(JSON.stringify(response.body))
      

      
    })
    cy.visit('')
    cy.createBlog("most likes","otto","hehe")
    cy.createBlog("second most likes","otto","hehe")
    cy.createBlog("third most likes","asd","ds")
    cy.get(".blog").eq(0).contains("view").click()
    cy.get(".blog").eq(1).contains("view").click()
    for(let i =0;i<5;i++){
      cy.get("button").eq(2).click()
    }
    
    for(let i =0;i<3;i++){
      cy.get("button").eq(5).click()
    }
    
    cy.visit('')

    cy.get('.blog').eq(0).contains('most likes')
    cy.get('.blog').eq(1).contains('second most likes')
    cy.get('.blog').eq(2).contains('third most likes')
    
    
  })



})

