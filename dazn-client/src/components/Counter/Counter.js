import { useEffect, useState } from 'react'
import styles from './Counter.module.scss'
const Counter = (
    {
        from = 1,
        to = 100,
        hidden = false,
        milliseconds = 1000,
        onComplete = () => {},
        onInterval = () => {}}) => {

    const [counter, setCounter] = useState(from)
    const value = to > from ? 1 : -1

    useEffect(() => {
        const handler = setTimeout(() => {
            setCounter(counter + value)
        }, milliseconds)

        if (counter === to) {
            clearTimeout(handler)
            onComplete()
        }
        else {
            onInterval()
        }
        return () => {
            clearTimeout(handler)
        }
    }, [counter])

    if (hidden) return null

    return (
        <div className={styles.counter}>
            {counter}
        </div>
    )
}

export default Counter