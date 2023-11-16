import React from "react";

const Btn = ({onClick, txt}) => {
    return (
        <button onClick={onClick}>{txt}</button>
    )
}

export default Btn;