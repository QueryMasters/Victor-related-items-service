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
            relatedItemsCurrent: [],
            currentArr: 0,
            maxRelatedLength: 5,
            itemId: 2
        }

        // click bindings
        this.arrowClick = this.arrowClick.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    arrowClick(dir) {
        if (dir === 'right') {
            this.setState({
              currentArr: (this.state.currentArr + 1) % this.state.relatedItemsCurrent.length
            });
        } else if (dir === 'left') {
            this.setState({
              currentArr: (this.state.currentArr - 1) >= 0 ? (this.state.currentArr - 1) : (this.state.relatedItemsCurrent.length - 1)
            });
        }
    }

    // helper function to chunk related items array
    chunk(array, length) {
        let chunked = [];
        let i = 0;
        let n = array.length;

        while (i < n) {
            chunked.push(array.slice(i, i += length));
        }
        return chunked;
    }

    itemClick(id) {
        this.setState({
            itemId: id,
            relatedItems: [],
            relatedItemInfo: [],
            relatedItemsCurrent: [],
            currentArr: 0,
            maxRelatedLength: 5,
        });
        axios.get(`/api/related/${this.state.itemId}`)
        .then((res) => {
            let data = res.data;
            this.setState({
                relatedItems: data,
            });
            data.forEach((datum) => {
                axios.get(`/api/items/${datum.id_item1}`)
                .then((res) => {
                    this.setState({
                        relatedItemInfo: [...this.state.relatedItemInfo, ...res.data],
                    });
                })
                .then(() => {
                    // trying to figure out why this won't work as a promise after first then statement, it only works are a promise here
                    this.setState({
                        relatedItemsCurrent: this.chunk(this.state.relatedItemInfo, this.state.maxRelatedLength)
                    })
                });
            });
            // console.log('let us see if this is called more than once 1',this.state.relatedItemsCurrent);
        });
        // after click, we need to update page,
        // including most state props
    }

    componentDidMount() {
        axios.get(`/api/related/${this.state.itemId}`)
        .then((res) => {
            let data = res.data;
            this.setState({
                relatedItems: data,
            });
            data.forEach((datum) => {
                axios.get(`/api/items/${datum.id_item1}`)
                .then((res) => {
                    this.setState({
                        relatedItemInfo: [...this.state.relatedItemInfo, ...res.data],
                    });
                })
                .then(() => {
                    // trying to figure out why this won't work as a promise after first then statement, it only works are a promise here
                    this.setState({
                        relatedItemsCurrent: this.chunk(this.state.relatedItemInfo, this.state.maxRelatedLength)
                    })
                });
            });
            // console.log('let us see if this is called more than once 1',this.state.relatedItemsCurrent);
        });
        // .then(() => {
        //     console.log('let us see if this is called more than once 2',this.state.relatedItemsCurrent);
        // });
        
    }
    
    render() {
        return (
            <div>
                <RelatedItemList 
                    relatedItemInfo={this.state.relatedItemInfo} 
                    arrowClick={this.arrowClick} 
                    relatedItemsCurrent={this.state.relatedItemsCurrent} 
                    currentArr={this.state.currentArr}
                    itemClick={this.itemClick}
                />
            </div>
        )
    }

}



ReactDOM.render(<App />, document.getElementById('app'))