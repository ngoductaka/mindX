import logo from './logo.svg';
import './App.css';
// b02 props
import { App as Props_input } from './com02/props_input';
// b02 class state
import ClassCom from './com02/class_com';
import { HookCom } from './com02/hook_com';


function AppInit() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// export default Props_input;
// export default ClassCom;
export default HookCom;
// export default App;

