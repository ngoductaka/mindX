import React from 'react';

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
  // componentWillUnmount() {
  //   console.log('Component WILL UNMOUNT!')
  // }

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
        <h3 onClick={() => this.setState({ state: this.state.state + 1 })}>{'this.props.myNumber'}</h3>
        <h3>{this.state.state}</h3>
      </div>
    );
  }
}


const App = () => {
  const [show, setShow] = React.useState(true);

  return (
    <>
      <button onClick={() => setShow}>switch</button>
      {show ? <MiniCom dnd={{ value: 1 }} /> : null}
    </>
  )
}
export default App;