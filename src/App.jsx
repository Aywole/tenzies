import React from "react"
import Die from "./Die"
import Timer from "./Timer"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [time, setTime] = React.useState({on: false, value: 0})
    const [roll, setRoll] = React.useState(0)
    
    //Checks when the game completed &&
    //All the Die have been held
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setTime(prevObj => ({...prevObj, on: false}))
        }
    }, [dice])
    
    //When the game is completed and tenzies is true
    React.useEffect(()=>{
        if (tenzies){
            if (!JSON.parse(localStorage.getItem("time"))){
                localStorage.setItem("time", JSON.stringify(time.value))
            }else{
                if(time.value < JSON.parse(localStorage.getItem("time"))){
                    localStorage.setItem("time", JSON.stringify(time.value))
                }
            }
            // console.log("Fisihed in " + roll + " rolls")
        }
    }, [tenzies])
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            time.value > 0 && setRoll(prevRoll => prevRoll + 1)
        } else {
            // When new game is clicked.
            setTenzies(false)
            setDice(allNewDice())
            setTime(prevObj => ({...prevObj, value: 0}))
            setRoll(0)
        }
    }
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
        if (!time.on && !tenzies){
            setTime(preTime => (
                {...preTime, on: true}
            ))
        }
    }
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti className="confetti"/>}
            {/** Mounting and Unmounting the timer component **/}
            {time.on && <Timer 
                setTime = {()=>{
                    setTime(OldObj => ({...OldObj, value: OldObj.value + 1}))
                    }}
                time = {time.value}
            />}
            <h3 className="time">Current time: {time.value}s</h3>
            
            <h1 className="title">Tenzies</h1>
            <h3 className="time">Best time: {JSON.parse(localStorage.getItem("time")) || 0}s</h3>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <span className="roll-value">Rolls: {roll}</span>
        </main>
    )
}