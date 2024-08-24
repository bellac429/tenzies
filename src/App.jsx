import { useState } from 'react'
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    
    // initializes dice objects with a random value
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: true,
                id: nanoid()
            })
        }
        return newDice
    }
    
    // onClick for button that roles dice
    function rollDice() {
        setDice(allNewDice())
    }
    
    // create dice elements
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} />
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

