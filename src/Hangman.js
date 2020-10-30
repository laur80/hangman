import React, { useState } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

function Hangman (){
  /** by default, allow 6 guesses and use provided gallows images. */
 const init = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  const[state,setState]=useState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  // constructor(props) {
  //   super(props);
  //   this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
  //   this.handleGuess = this.handleGuess.bind(this);
  //   this.reset = this.reset.bind(this);
  // }
  function reset() {
    setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  function guessedWord() {
    return state.answer.split("").map(ltr => (state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  function handleGuess(evt) {
    let ltr = evt.target.value;
    setState(st => ({
      ...st,
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */

    const gameOver = state.nWrong >= init.maxWrong;
    const isWinner = guessedWord().join("") === state.answer;
    const altText = `${state.nWrong}/${init.maxWrong} guesses`;
    let gameState = generateButtons();
    if (isWinner) gameState = "You Win!";
    if (gameOver) gameState = "You Lose!";

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={init.images[state.nWrong]} alt={altText} />
        <p>Guessed Wrong: {state.nWrong}</p>
        <p className='Hangman-word'>
          {!gameOver ? guessedWord() : state.answer}
        </p>
        <p className='Hangman-btns'>{gameState}</p>
        <button id='reset' onClick={reset}>
          Restart?
        </button>
      </div>
    );

}

export default Hangman;
