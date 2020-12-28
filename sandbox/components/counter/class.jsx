import React, {Component} from "react";

class ClassExample extends Component {
    state = {
        count: 0
    };

    componentDidMount() {
        const { count } = this.state;
        setTimeout(() => {
            console.log(`%cYou clicked ${count} times`, 'font-size: 20px');
        }, 3000);
    }

    componentDidUpdate() {
        const { count } = this.state;
        setTimeout(() => {
            console.log(`%cYou clicked ${count} times`, 'font-size: 20px');
        }, 3000);
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({
                    count: this.state.count + 1
                })}>
                    Click me
                </button>
            </div>
        )
    }
}

export default ClassExample;