import { useState } from 'react'
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {

    const [dice, setDice] = useState(allNewDice())

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
        setDice(oldDice => oldDice.map(die => {
            if (die.isHeld === true) {
                return die
            } else { // if die is not held, reroll it's value
                return generateNewDie()
            }
        }))
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
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}

