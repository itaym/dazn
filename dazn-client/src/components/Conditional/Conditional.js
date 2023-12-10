const Conditional = ({condition = true, children}) => {
    return condition ? children : null
}

export default Conditional