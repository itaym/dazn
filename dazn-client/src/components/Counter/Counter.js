import React, { useState } from 'react'
import Conditional from '../Conditional'
import propTypes from 'prop-types'

const Question = ({question, onComplete = () => {}}) => {
    const { question_id, question: question_txt, answer_index, choices, hint } = {
        "question_id": 1,
        "question": "What famous Roman general and statesman was assassinated on the Ides of March in 44 BC?",
        "answer_index": 0,
        "choices": ["Julius Caesar", "Augustus"],
        "hint": "He was also a renowned military commander."
    }
    const [state, setState] = useState({ selected: -1, showHint: false })

    const onChange = radioIndex => () => {
        setState({ ...state, selected: radioIndex })
    }
    const { selected, showHint } = state
    return (
        <div>
            <div>{question_txt}</div>
            <div>{answer_index}</div>
            <Conditional condition={showHint}>
                <div>{hint}</div>
            </Conditional>
            {choices.map((option, index) => {
                    const unique = `${question_id}_${index}`
                    return (
                        <div key={unique}>
                            <input
                                onChange={onChange(index)}
                                id={unique}
                                name={`${question_id}`}
                                type="radio"
                                checked={selected === index}
                                value={option} />
                            <label htmlFor={unique}>{option}</label>
                        </div>)
                }
            )}
        </div>
    )
}

Question.propTypes = {
    question: propTypes.objectOf({})
}
export default Question