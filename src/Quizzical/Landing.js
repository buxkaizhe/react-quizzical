import React from 'react'
import './styles.css'

export default function Landing(props) {
    return (
        <div className="wrapper center">
            <h1>Quizzical</h1>
            <h2>Some description if needed</h2>
            <button
                onClick={() => props.setLanding(false)}
                className="button-start-quiz">
                Start Quiz
            </button>
        </div>
    )
}
