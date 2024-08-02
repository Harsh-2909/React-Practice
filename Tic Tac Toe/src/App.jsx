import { useState } from "react";
import { Square } from "./Components/Square";

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [userState, setUserState] = useState("X");
    const [winnerDecided, setWinnerDecided] = useState(false);
    const [message, setMessage] = useState(null);

    /**
     * This function handles the click event on the square
     * @param { number } i - index of the square clicked
     */
    function handleSquareClick(i) {
        if (winnerDecided || squares[i]) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = userState;
        setSquares(newSquares);
        const isWinnerDecided = checkWinner(newSquares);
        if (isWinnerDecided) {
            setMessage(`Winner is Player ${userState}`);
            setWinnerDecided(true);
        } else if (isDraw(newSquares)) {
            setMessage("It's a Draw");
        }
        const newUserState = userState === "X" ? "O" : "X";
        setUserState(newUserState);
    }

    function handleBoardReset() {
        setSquares(Array(9).fill(null));
        setUserState("X");
        setWinnerDecided(false);
        setMessage(null);
    }

    return (
        <>
            <div className="status">{message}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
            </div>
            <br />
            <button style={{ color: "red" }} onClick={handleBoardReset}>
                Reset
            </button>
            <p></p>
        </>
    );
}

function checkWinner(squares) {
    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const winState of winningStates) {
        const [a, b, c] = winState;
        if (
            squares[a] === squares[b] &&
            squares[b] === squares[c] &&
            squares[a] !== null
        ) {
            return true;
        }
    }
    return false;
}

const isDraw = (newSquares) => {
    return newSquares.filter((e) => e !== null).length === 9;
};
