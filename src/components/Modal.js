import React from "react";
import { isCompositeComponent } from "react-dom/test-utils";

const Modal = ({isCorrect, turn, solution}) => {
    return (
        <div className="modal">
            {
                isCorrect && (
                    <div>
                        <h1>You Win !!</h1>
                        <p className="solution">{solution}</p>
                        <p>You found the solution is {turn} guesses!!</p>
                    </div>
                )
            }
            {
                !isCorrect && (
                    <div>
                        <h1>Nevermind !!</h1>
                        <p className="solution">{solution}</p>
                        <p>Better luck next time!! 😢</p>
                    </div>
                )
            }
        </div>
    )
}   

export default Modal;