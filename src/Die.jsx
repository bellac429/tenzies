

export default function Die(props) {

    const styles = { // conditionally render styles for if the die is clicked or not
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}