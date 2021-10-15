import React, { useState, useEffect } from 'react';

export const HookCom = () => {
    const [date, setDate] = useState(new Date())
    const [clickCount, setClickCount] = React.useState(0);
    // 
    useEffect(() => {
        // console.log("clickCount_2", clickCount);
        return () => {
            // console.log("clickCount_3", clickCount);
        }
    }, [clickCount])

    useEffect(() => {
        setInterval(() => {
            // setDate(new Date())
        }, 1000)
        return () => {
            console.log('==========useEffect unmounting')
        }
    }, [])

    useEffect(() => {
        console.log('useEffect call', clickCount)
        // Update the document title using the browser API
        document.title = `You clicked ${clickCount} times`;
        return () => {
            console.log('useEffect Clean', clickCount)
        }
    });
    // 
    const _handleClick = () => {
        setClickCount(clickCount + 1);
        // console.log("clickCount_1", clickCount);
    }
    console.log('Render call')
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
            <h1>Click Count <button onClick={_handleClick}>Click here</button></h1>
            <h2>{clickCount}</h2>
            {/* {clickCount & 1 ? <MiniCom /> : null} */}
        </div>
    )
}

//  Exam 

const MiniCom = () => {

    useEffect(() => {
        console.log('useEffect MiniCom call')
        return () => {
            console.log('useEffect Clean MiniCom call')
        }
    }, []);
    return (
        <div />
    )
}