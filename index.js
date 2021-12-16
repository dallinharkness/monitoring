const express = require('express')
const path = require('path')

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '464f3b8bfb3b471ea5abb8c1ac18ae39',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()
app.use(express.json())





app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})


app.post('/api/student', (req,res) => {
    let{name=req.body}
    name = name.trim()

    students.push(name)

    rollbar.log('student added successfully', {author: 'Dallin', type: 'manual'})

    res.status(200).send(students)
})


app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to port ${port}!`))


