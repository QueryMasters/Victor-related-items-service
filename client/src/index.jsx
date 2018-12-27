import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import RelatedItemList from './components/RelatedItemList.jsx';
import FrequentItemList from './components/FrequentItemList.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //related items state
            relatedItems: [], // array of id's of related items
            relatedItemInfo: [], // info of the related items
            relatedItemsCurrent: [], // chunked version of info of the related items
            currentArr: 0, // current chunked array to display on related items
            maxRelatedLength: 6, // total number of items to display on related item list

            // frequent items state
            frequentItems:[], // array of id's of frequent items 
            frequentItemsInfo:[],   // actual info of the frequent items
            checkItems: [],

            // current item
            itemId: 40  // id of current item
        }

        // click bindings
        this.arrowClick = this.arrowClick.bind(this);
        this.startOver = this.startOver.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.checkHandler = this.checkHandler.bind(this);

    }
    // click Handlers
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

    startOver() {
        this.setState({currentArr: 0});
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
            frequentItems:[],
            frequentItemsInfo:[]
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
                    });
                });
            });
            // console.log('let us see if this is called more than once 1',this.state.relatedItemsCurrent);
        });
        // after click, we need to update page,
        // including most state props
        axios.get(`/api/frequent/${this.state.itemId}`)
        .then((res) => {
            let data = res.data;
            this.setState({
                frequentItems: data,
            });
            axios.get(`/api/items/${this.state.itemId}`)
            .then((res) => {
                res.data.forEach(datum => {
                    datum = this.addChecked(datum);
                });
                this.setState({
                    frequentItemsInfo: [...this.state.frequentItemsInfo, ...res.data],
                    // checkItems: [...this.state.checkItems, addChecked(...res.data)]
                });
            });
            data.forEach((datum) => {
                axios.get(`/api/items/${datum.id_item1}`)
                .then((res) => {
                    res.data.forEach(datum => {
                        datum = this.addChecked(datum);
                    });
                    this.setState({
                        frequentItemsInfo: [...this.state.frequentItemsInfo, ...res.data],
                        // checkItems: [...this.state.checkItems, addChecked(...res.data)]
                    });
                    // console.log('frequentItemsInfo is, ', this.state.frequentItemsInfo);
                })
                
            });
        });
    }

    checkHandler(itemId){
        let freq = this.state.frequentItemsInfo;
        let checkedItem = freq.map(el => {
            return el.id
        }).indexOf(itemId);
        if (checkedItem > -1) {
            freq[checkedItem].checked = !freq[checkedItem].checked;
            this.setState({
                frequentItemsInfo: freq
            })
        }
        
    }

    // object decorator for adding checked inital status to frequent items
    addChecked(frequentItem) {
        let decObj = frequentItem;
        decObj.checked = true;
        return decObj;
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

        axios.get(`/api/frequent/${this.state.itemId}`)
        .then((res) => {
            let data = res.data;
            this.setState({
                frequentItems: data,
            });
            axios.get(`/api/items/${this.state.itemId}`)
            .then((res) => {
                res.data.forEach(datum => {
                    datum = this.addChecked(datum);
                });
                this.setState({
                    frequentItemsInfo: [...this.state.frequentItemsInfo, ...res.data],
                    // checkItems: [...this.state.checkItems, addChecked(...res.data)]
                });
            });
            data.forEach((datum) => {
                axios.get(`/api/items/${datum.id_item1}`)
                .then((res) => {
                    res.data.forEach(datum => {
                        datum = this.addChecked(datum);
                    });
                    this.setState({
                        frequentItemsInfo: [...this.state.frequentItemsInfo, ...res.data],
                        // checkItems: [...this.state.checkItems, addChecked(...res.data)]
                    });
                    // console.log('frequentItemsInfo is, ', this.state.frequentItemsInfo);
                })
                
            });
        });
        
    }
    
    render() {
        return (
            <div>
                <FrequentItemList 
                    frequentItemsInfo={this.state.frequentItemsInfo}
                    checkHandler={this.checkHandler}
                    itemClick={this.itemClick}
                />

                <RelatedItemList 
                    relatedItemInfo={this.state.relatedItemInfo} 
                    arrowClick={this.arrowClick} 
                    startOver={this.startOver}
                    relatedItemsCurrent={this.state.relatedItemsCurrent} 
                    currentArr={this.state.currentArr}
                    itemClick={this.itemClick}
                    currentPage={this.state.currentArr}
                />
            </div>
        )
    }

}



ReactDOM.render(<App />, document.getElementById('app'))