import React from 'react';

class ClassCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), clickCount: 0 };
    }
    // life cycle?
    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     1000
        // );
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
            // console.log('this.state.clickCount_2', this.state.clickCount)
        })
        // console.log('this.state.clickCount_1', this.state.clickCount)
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
                {this.state.clickCount & 1 ? <MiniCom 
                // myNumber={this.state.clickCount}
                 /> : null}
            </div>
        );
    }
}

export default ClassCom;




class MiniCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 1
        }
        console.log('constructor');
    }
    componentDidMount() {
        console.log('Component DID MOUNT!');
        setTimeout(() => {
            this.setState({
                state: 2,
            })
        }, 1000)

    }
    shouldComponentUpdate(newProps, newState) {
        console.log('shouldComponentUpdate', { newProps, newState })
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!', { prevProps, prevState })
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }

    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps", { props, state })
        return { ...state };
    }

    // life cycle?
    // componentWillMount() {
    //     console.log('Component WILL MOUNT!')
    // }
    // componentWillReceiveProps(newProps) {
    //     console.log('Component WILL RECIEVE PROPS!', { newProps })
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('Component WILL UPDATE!', { nextProps, nextState });
    // }

    render() {
        console.log('Render')
        return (
            <div>
                <h3>{this.props.myNumber}</h3>
            </div>
        );
    }
}
