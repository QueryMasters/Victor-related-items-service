import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import RelatedItemList from './components/RelatedItemList.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedItems: [],
            relatedItemInfo: [],
            itemId: 58
        }
    }

    componentDidMount() {
        axios.get(`/api/related/${this.state.itemId}`)
        .then((res) => {
            let data = res.data;
            this.setState({relatedItems: data});
            data.forEach((datum) => {
                axios.get(`/api/items/${datum.id_item1}`)
                .then((res) => {
                    this.setState({relatedItemInfo: [...this.state.relatedItemInfo, ...res.data]});
                });
            });
        });
        
    }
    
    render() {
        return (
            <div>
                <RelatedItemList relatedItemInfo={this.state.relatedItemInfo}/>
            </div>
        )
    }

}



ReactDOM.render(<App />, document.getElementById('app'))