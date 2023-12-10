import express from 'express'
import questions from './questions.js'

const router = express.Router()

const shuffle = (array) => {
    for (let x = 0; x < array.length; x++) {
        const a = Math.round(Math.random() * (array.length - 1))
        const b = Math.round(Math.random() * (array.length - 1))
        let tmp = array[a]
        array[a] = array[b]
        array[b] = tmp
    }
    return array
}

router.get('/quiz', async function(req, res) {
    const randomQuestion = shuffle([...questions])
    return res.status(200).send(randomQuestion.slice(0, 5));
})

export default router