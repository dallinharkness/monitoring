const express = require('express')
const path = require('path')

const app = express()

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '464f3b8bfb3b471ea5abb8c1ac18ae39',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545
app.listen(port, () => console.log(`Take us to port ${port}!`))


