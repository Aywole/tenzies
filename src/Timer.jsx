import React from "react"

export default function Timer(props) {
        React.useEffect(()=>{
        const timing = setInterval(
            props.setTime , 1000)
        // console.log("mounted ...")
        return function (){
            clearInterval(timing)
            // console.log("unmounted ....")
        }
    }, [])

    return "" 
}