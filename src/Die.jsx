import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{(()=>{
                switch(props.value){
                    case 1: return (
                            <span className={`dot-${props.value} dot-container`}>
                                <span className="dot"></span>
                            </span>
                            )
                     case 2: return ( 
                        <span className={`dot-${props.value} dot-container`}>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </span>
                        )
                    case 3: return (
                        <span className={`dot-${props.value} dot-container`}>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </span>
                        )
                    case 4: return (
                        <span className={`dot-${props.value} dot-container`}>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </span>
                        )
                    case 5: return ( 
                        <span className={`dot-${props.value} dot-container`}>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot dot-5-3'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </span>
                        )
                    case 6: return (
                        <span className={`dot-${props.value} dot-container`}>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </span>
                        )
                }
            })()}</h2>
        </div>
    )
}
            // <h2 className="die-num">{props.value}</h2>