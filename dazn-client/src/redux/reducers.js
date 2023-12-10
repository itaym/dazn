import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = {
    error: undefined,
    question_index: -1,
    questions: [],
    answersCount: { correct: 0, wrong: 0 }
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.getQuestions.fulfilled, (state, action) => {
            state.questions = action.payload.questions
        })
        .addCase(actions.getQuestions.rejected, (state, action) => {
            ({error: state.error} = action.payload)
        })
        .addCase(actions.nextQuestion.fulfilled, (state, action) => {
            state.question_index = action.payload.question_index
            if (action.payload.question_index > 0) {
                if (action.payload.isCorrect)
                    state.answersCount.correct++
                else
                    state.answersCount.wrong++
            }
        })
})

export default reducer