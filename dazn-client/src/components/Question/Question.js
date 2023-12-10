import React, { useCallback, useState } from 'react'
import Conditional from '../Conditional'
import Counter from '../Counter'
import style from './Question.module.scss'

const Question = ({question, onComplete = (isCorrect) => isCorrect}) => {
    const { question_id, question: question_txt, answer_index, choices, hint } = question
    const [state, setState] = useState({ selected: -1, showHint: false, timeOut: false })

    const onRadioChange =  useCallback(radioIndex => () => {
        setState({ ...state, selected: radioIndex })
    }, [state])
    const onHintCounter = useCallback(() => {
        setState({...state, showHint: true})
    }, [state])
    const onQuestionCounter = useCallback(() => {
        setState({...state, timeOut: true})
    }, [state])
    const onCompleteCounter = useCallback(() => {
        onComplete(answer_index === selected)
    }, [state])
    const { selected, showHint, timeOut } = state
    return (
        <div className={style.question}>
            <div className={style.question_txt}>{question_txt}</div>
            {choices.map((option, index) => {
                    const unique = `${question_id}_${index}`
                    return (
                        <div className={style.options} key={unique}>
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
            <Conditional condition={showHint}>
                <div className={style.hint}>
                <div>Did you know:</div>
                <div>{hint}</div>
                </div>
            </Conditional>
            <Conditional condition={timeOut}>
                <div className={style.correct}>
                    <div>Correct Answer is:</div>
                    <div>{choices[answer_index]}</div>
                </div>

            </Conditional>
            <Conditional condition={selected > -1}>
                <button className={style.next_question} onClick={onCompleteCounter}>Next</button>
            </Conditional>
            <Counter from={20} to={1} onComplete={onQuestionCounter}/>
            <Counter from={1} to={10} hidden={true} onComplete={onHintCounter} />
            <Counter from={1} to={21} hidden={true} onComplete={onCompleteCounter} />
        </div>
    )
}

export default Question