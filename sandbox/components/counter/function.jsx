import React, {useState, useEffect} from "react";

const FunctionExample = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log(`%cYou clicked ${count} times`, 'font-size: 20px');
        }, 3000);
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default FunctionExample;