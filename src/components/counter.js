import React, { useState } from "react";

const Counter = ()=>{
    const[count, setCount]=useState(0)
    return(
        <>
            <h2>{count}</h2>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
        </>
    );
}

export default Counter;