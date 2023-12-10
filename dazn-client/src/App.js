import Conditional from './components/Conditional'
import Question from './components/Question'
import Summery from './components/Summery'
import styles from './App.module.scss'
import { getQuestions, nextQuestion } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const App = () => {

    const dispatch = useDispatch()
    const error = useSelector(( { error } ) => error)
    const question_index = useSelector(( { question_index } ) => question_index)
    const questions = useSelector(( { questions } ) => questions)

    const startQuiz = (isCorrect) => dispatch(nextQuestion(isCorrect))
    const gotoNextQuestion = startQuiz

    useEffect(() => {
        setTimeout(() => dispatch(getQuestions()), 1000)
    }, [dispatch])

    return (
        <div className={styles.app}>
            <div className={styles.background}></div>
            <div className={styles.header}>
                Ancient Rome Quiz
            </div>
            <Conditional condition={questions.length === 0}>
                Loading...
            </Conditional>
            <Conditional condition={questions.length > 0 && question_index === -1}>
                <button
                    className={styles.start_quiz}
                    onClick={startQuiz}>Start Quiz</button>
            </Conditional>
            <Conditional condition={question_index > -1 && question_index < questions.length}>
                <Question
                    key={question_index}
                    onComplete={gotoNextQuestion}
                    question={questions[question_index]} />
            </Conditional>
            <Conditional condition={question_index === questions.length}>
                <Summery />
            </Conditional>
            <Conditional condition={error}>
                {error}
            </Conditional>

        </div>
    )
}

export default App
