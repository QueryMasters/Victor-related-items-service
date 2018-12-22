import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
render() {
    return (
        <div>
            Hello Mr. Component
        </div>
    )
}

}



ReactDOM.render(<App />, document.getElementById('app'))