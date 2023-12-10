import React, { useState } from 'react'
import Conditional from '../Conditional'
import Counter from '../Counter'
import propTypes from 'prop-types'

const Question = ({question, onComplete = (isCorrect) => isCorrect}) => {
    const { question_id, question: question_txt, answer_index, choices, hint } = question
    const [state, setState] = useState({ selected: -1, showHint: false, timeOut: false })

    const onRadioChange = radioIndex => () => {
        setState({ ...state, selected: radioIndex })
    }
    const onHintCounter = () => {
        setState({...state, showHint: true})
    }
    const onQuestionTimer = () => {
        setState({...state, timeOut: true})
    }
    const onCompleteCounter = () => {
        onComplete(answer_index === selected)
    }
    const { selected, showHint, timeOut } = state
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
                                checked={selected === index}
                                disabled={timeOut}
                                id={unique}
                                name={`${question_id}`}
                                onChange={onRadioChange(index)}
                                type="radio"
                                value={option} />
                            <label htmlFor={unique}>{option}</label>
                        </div>)
                }
            )}
            <Conditional condition={timeOut}>
                <div>{choices[answer_index]}</div>
            </Conditional>
            <Counter from={1} to={20} onComplete={onQuestionTimer}/>
            <Counter from={1} to={10} hidden={true} onComplete={onHintCounter} />
            <Counter from={1} to={21} hidden={true} onComplete={onCompleteCounter} />
        </div>
    )
}

Question.propTypes = {
    question: propTypes.objectOf({}),
    onComplete: propTypes.func
}
export default Question