import React from 'react';

class ClassCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), clickCount: 0 };
    }
    // life cycle?
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    _handleClick = () => {
        this.setState({
            clickCount: this.state.clickCount + 1
        }, () => {
            console.log('this.state.clickCount_2', this.state.clickCount)
        })
        console.log('this.state.clickCount_1', this.state.clickCount)
    }

    // what is this
    _handleClick2() {
        this.setState({
            clickCount: this.state.clickCount + 1
        })
        // Correct
        this.setState((state, props) => ({
            counter: state.clickCount + 1
        }));
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <h1>Click Count <button onClick={this._handleClick}>Click here</button></h1>
                <h2>{this.state.clickCount}</h2>
            </div>
        );
    }
}

export default ClassCom;