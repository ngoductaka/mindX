import React from 'react';

function Welcome(props) {
    // props.name = 'ddd';
    return <h1>Hello, {props.name}</h1>;
}


function Header(props) {
    return (
        <div>
            <p>Header:</p>
            <props.Com name={props.name} />
            {props.children}
        </div>
    );
}

export function App() {
    return (
        <div>
            <Header Com={Welcome} name="dnd" >
                <Welcome name="ngoc duc" />
            </Header>
        </div>
    );
}