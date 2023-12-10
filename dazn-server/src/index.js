import cors from 'cors'
import express from 'express'
import quizRoute from './api/quizRoute.js'

/*
THIS IS THE SIMPLEST SERVER I COULD MAKE
 */

const app = express()

app.use(cors())
app.use('/api', quizRoute)

app.get('/*', (req, res) => {
    res.send('Hello World!')
})

app.listen(3001, () => console.log('Listening on port 3001'))
