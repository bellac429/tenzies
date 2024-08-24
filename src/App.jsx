import { useState } from 'react'
import { useEffect } from 'react';
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
export default function App() {

    const [dice, setDice] = useState(allNewDice()) // dice in game
    const [tenzies, setTenzies] = useState(false) // true, if game is one

    // check if tenzies was achieved
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld) // all dice must be held to win
        const firstValue = dice[0].value 
        const allSameValue = dice.every(die => die.value === firstValue) // all dice must have same value
        if (allHeld && allSameValue) {
            setTenzies(true) // set game state to won
            console.log("You won!")
        }
    }, [dice])
    

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }
    
    // initializes dice objects with a random value
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    // checks if dice are selected and rolls dice that aren't selected
    function rollDice() {
        if(!tenzies) { // if games isn't won, reroll dice
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else { // if game is one, set new game and reset all dice
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    // holds dice to not reroll and change their value
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? // if the die is clicked, flip it's isHeld value
                {...die, isHeld: !die.isHeld} :
                die // don't update dice that are not clicked
        }))
    }

    // create dice elements
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    ))

    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same. Click each die to freeze
                 it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}

