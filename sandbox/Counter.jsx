import React from 'react';
import ClassExample from "./components/counter/class";
import FunctionExample from "./components/counter/function";

const Counter = () => {
    return (
        <>
            <p>Function: <FunctionExample /></p>
            <br/>
            <p>Class: <ClassExample /></p>
        </>
    )
}

export default Counter;