import { createAsyncThunk } from '@reduxjs/toolkit'

const ACTION_GET_QUESTIONS = 'ACTION_GET_QUESTIONS'
const ACTION_NEXT_QUESTIONS = 'ACTION_NEXT_QUESTIONS'

const api = 'http://localhost:3001/api/quiz'

export const getQuestions = createAsyncThunk(
    ACTION_GET_QUESTIONS,
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${api}`)
            const questions = await response.json()
            return { questions }
        }
        catch ({ message: error } ) { return  rejectWithValue({ error }) }
    }
)

export const nextQuestion = createAsyncThunk(
    ACTION_NEXT_QUESTIONS,
    async (isCorrect, { getState }) => {
        let { question_index } = getState()
        question_index++
        return { question_index, isCorrect }
    }
)