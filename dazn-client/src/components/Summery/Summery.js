import React from 'react'
import styles from './Summery.module.scss'
import { useSelector } from 'react-redux'

const Summery = () => {
    const { correct, wrong } = useSelector(({ answersCount }) => answersCount)
    const score = Math.round(correct * 100 / (correct + wrong))

    const onRestart = () => {
        document.location.href = '/';
    }
    return (
        <div className={styles.summery}>
            <div>score: {score}</div>
            <div>correct answers: {correct}</div>
            <div>wrong answers: {wrong}</div>
            <button
                className={styles.restart}
                onClick={onRestart}>
                Start Again
            </button>
        </div>
    )
}

export default Summery