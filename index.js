const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const https = require('https')

const { users, sessions, items, userdocs, themes, admins, aws } = require('./routes')

const port = process.env.PORT || 3030

const app = express()
const server = https.Server(app)

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(users)
  .use(sessions)
  .use(items)
  .use(userdocs)
  .use(themes)
  .use(admins)
  .use(aws)

  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
