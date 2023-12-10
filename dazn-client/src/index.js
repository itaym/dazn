import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import reducer from './redux/reducers'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
