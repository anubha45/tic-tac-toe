import { useState } from 'react'
import './App.css'

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWinner(board) {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  const winner = checkWinner(board)
  const isDraw = !winner && board.every((square) => square !== null)
  const gameOver = winner || isDraw

  function handleClick(index) {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isXTurn ? 'X' : 'O'
    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  function handleReset() {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
  }

  const status = winner
    ? `${winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `${isXTurn ? 'X' : 'O'}'s turn`

  return (
    <main className="game">
      <header className="game-header">
        <h1>Tic Tac Toe</h1>
        <p className="game-status">{status}</p>
      </header>

      <div className="board" role="grid" aria-label="Tic tac toe board">
        {board.map((square, index) => (
          <button
            key={index}
            type="button"
            className={`square${square === 'X' ? ' square-x' : square === 'O' ? ' square-o' : ''}`}
            onClick={() => handleClick(index)}
            disabled={gameOver || square !== null}
            aria-label={
              square ? `Square ${index + 1}, ${square}` : `Square ${index + 1}, empty`
            }
          >
            {square && <span className="mark">{square}</span>}
          </button>
        ))}
      </div>

      {gameOver && (
        <button type="button" className="reset-btn" onClick={handleReset}>
          Play again
        </button>
      )}
    </main>
  )
}

export default App
