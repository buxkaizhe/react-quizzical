import React from 'react'
import he from 'he'
export default function Question(props) {

    function showAnswers(submitted) {
        return props.answers.map(a => {


            // answer is selected
            const selected = a === props.selected_answer ? " answer-selected" : ""

            // if answer selected and correct
            const correct = props.show_answer && a === props.correct_answer ? " answer-correct" : ""

            // if answer selected and wrong
            const wrong = props.show_answer && selected && a !== props.correct_answer ? " answer-wrong" : ""

            const disabled = props.show_answer && (!correct && !wrong) ? " answer-disabled" : ""

            return (
                <div
                    key={a}
                    className={"answer" + disabled + selected + correct + wrong}
                    
                    onClick={props.show_answer ? ()=>null : () => props.select(props.question, a)}
                >
                    {he.decode(a)}
                </div>
            )
        })
    }

    const allAnswers = showAnswers()


    return (
        <div className="question-block">
            <div className="question">{he.decode(props.question)}</div>
            <div className="answers">
                {allAnswers}
            </div>
        </div>

    )
}
