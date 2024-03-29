if (process.env.NODE_ENV !==  'production') {
  require('dotenv').config()
}

const app = require('./app')
const port = (process.env.PORT || 3000)
app
  .listen(port, () => {
    console.log(`Server on port: ${port}`)
  })
