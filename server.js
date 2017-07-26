const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/signup', (request, response) => {
  request.checkBody('name', 'You must enter a name').notEmpty().isLength(0, 100)
  request.checkBody('email', 'You must enter an email').notEmpty().isLength(0, 100)
  request.checkBody('yob', 'Year of Birth must be number between 1900 - 2017').isInt({ min: 1900, max: 2017 })
  request.checkBody('jobs', 'You must select a job from the list').notEmpty()
  request.checkBody('password', 'You must enter a password longer than 8 characters').notEmpty().isLength(8, undefined)
  var errors = request.validationErrors()

  if (errors) {
    var content = errors
    response.send(content)
  } else {
    var name = request.body.name
    var email = request.body.email
    var yob = request.body.yob
    var selected = request.body.jobs
    var pw = request.body.password
    var content = `<p>Your Name: ${name}</p>
    <p>Your Email: ${email}</p>
    <p>Your Birthyear: ${yob}</p>
    <p>Your Job: ${selected}</p>
    <p>Your Password: ${pw}</p>`
  }
  response.send(content)
})

app.listen(3000, () => {
  console.log('Listening...')
})
