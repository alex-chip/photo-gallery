const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const exphbs = require('express-handlebars')
const path = require('path')


const viewDir = `${__dirname}/views`
const publicDir = express.static(`${__dirname}/public`)
const routes = require('./routes')

// Initializations
const app = express()
require('./database')

// Settings
app
  // .set('port', port)
  .set('views', viewDir)
  .engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    extname: '.hbs'
  }))
  .set('view engine', '.hbs')

// Middlewares

const storage = multer.diskStorage({
  destination: `${__dirname}/public/img/uploads`,
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})

app
  .use(morgan('dev'))
  .use(multer({ storage }).single('image'))
  .use(express.json())
  .use(express.urlencoded({ extended : false }))

// Routes
app
  .use(routes)

// Public
app
  .use(publicDir)

module.exports = app
