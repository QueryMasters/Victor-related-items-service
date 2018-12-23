import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import RelatedItemList from './components/RelatedItemList.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedItems: [],
            itemId: 58
        }
    }

    componentDidMount() {
        axios.get(`/api/related/${this.state.itemId}`)
        .then((res) => {
            this.setState({relatedItems: res.data});
        });
    }
    
    render() {
        return (
            <div>
                <RelatedItemList relatedItems={this.state.relatedItems}/>
            </div>
        )
    }

}



ReactDOM.render(<App />, document.getElementById('app'))