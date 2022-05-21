import React, { useEffect } from 'react'
import { SpinnerCircular } from 'spinners-react'
import Question from './Question'

const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple"

export default function (props) {

    const [questions, setQuestions] = React.useState()
    const [submitted, setSubmitted] = React.useState(false)


    async function getQuestions() {
        setQuestions(null)
        const res = await fetch(API_URL)
        const data = await res.json()
        const finaldata = data.results.map(q => {
            const answers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
            return { ...q, answers: answers, selected_answer: null, show_answer: false }
        })
        console.log(finaldata)
        setSubmitted(false)
        setQuestions(finaldata)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    function select(question, answer) {
        setQuestions(oldQuestions => {
            return oldQuestions.map(q => {
                if (q.question === question)
                    q.selected_answer = answer
                return q
            })
        })
    }

    function submitAnswer() {

        setQuestions(oldQuestions => {
            return oldQuestions.map(q => {
                return { ...q, show_answer: true }
            })
        })
        setSubmitted(true);

    }

    function CorrectAnswersIndicator() {
        const correctAnswers = questions.map(q => q.correct_answer === q.selected_answer).reduce((a, b) => a + b)
        return (
            <div className="correct-indicator">You scored {correctAnswers}/5 correct answer(s)</div>
        )
    }

    const allQuestions = questions ? questions.map(q => <Question key={q.correct_answer} {...q} select={select} />) : null

    return (
        allQuestions ?
            <div className="wrapper">
                {allQuestions}
                <div className="submit-container">
                    {submitted && <CorrectAnswersIndicator />}
                    <button
                        onClick={submitted ? getQuestions : (questions.every( q => q.selected_answer != null) ? submitAnswer : null)}
                        className={questions.every( q => q.selected_answer != null) ? "button-submit" : "button-submit-disabled"}
                    >
                        {submitted ? "Play Again" : "Check Answer"}
                    </button>
                </div>
            </div>
            :
            <SpinnerCircular size={90} thickness={100} speed={100} color="#4D5B9E" secondaryColor="rgba(0, 0, 0, 0.44)" />
    )
}
