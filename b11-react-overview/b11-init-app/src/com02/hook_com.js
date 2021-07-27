import React, { useState, useEffect } from 'react';

export const HookCom = () => {
    const [date, setDate] = useState(new Date())
    const [clickCount, setClickCount] = useState(0);
    // 
    useEffect(() => {
        console.log("clickCount_2", clickCount);
    }, [clickCount])

    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])
    // 
    const _handleClick = () => {
        setClickCount(clickCount + 1);
        console.log("clickCount_1", clickCount);
    }

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
            <h1>Click Count <button onClick={_handleClick}>Click here</button></h1>
            <h2>{clickCount}</h2>
        </div>
    )
}