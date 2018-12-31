import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import axios from 'axios';

import RelatedItemList from './components/RelatedItemList.jsx';
import FrequentItemList from './components/FrequentItemList.jsx';
import ReviewModal from './components/ReviewModal.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dimensions
            width: null,
            height: null,

            //related items state
            relatedItems: [], // array of id's of related items
            relatedItemInfo: [], // info of the related items
            relatedItemsCurrent: [], // chunked version of info of the related items
            currentArr: 0, // current chunked array to display on related items
            maxRelatedLength: 3, // total number of items to display on related item list

            // frequent items state
            frequentItems:[], // array of id's of frequent items 
            frequentItemsInfo:[],   // actual info of the frequent items
            checkItems: [],

            // review modal
            showReviews: false,

            // current item
            itemId: 5 // id of current item
        }

        // click bindings
        this.arrowClick = this.arrowClick.bind(this);
        this.startOver = this.startOver.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.checkHandler = this.checkHandler.bind(this);
        this.updateDim = this.updateDim.bind(this);
        this.showReviews = this.showReviews.bind(this);
        this.hideReviews = this.hideReviews.bind(this);

        // debounce
        this.updateDim = _.debounce(this.updateDim, 50);

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
            maxRelatedLength: Math.max(Math.floor(innerWidth / 180), 3),
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

    updateDim() {
         
        let innerWidth = window.innerWidth;
        if(innerWidth > 620) {
            this.setState({
                maxRelatedLength: Math.floor(innerWidth / 175),
                relatedItemsCurrent: this.chunk(this.state.relatedItemInfo, Math.max(Math.floor(innerWidth / 180), 3)),

            });
            console.log(this.state);
        } else {
            this.setState({
                relatedItemsCurrent: this.chunk(this.state.relatedItemInfo, 3)
            })
        }
        
    };

    showReviews() {
        this.setState({showReviewsModal: true})
    }

    hideReviews() {
        this.setState({showReviewsModal: false})
    }

    componentDidMount() {

        this.updateDim();
        this.itemClick(this.state.itemId);
        window.addEventListener("resize", this.updateDim);
        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDim);
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
                
                <ReviewModal show={this.state.showReviewsModal} handleClose={this.hideReviews} >
                    <p>Hello from index.jsx</p>
                </ReviewModal >
                <button type='button' onClick={this.showReviews} className="write-review-button">Write a customer review</button>
            </div>
        )
    }

}



ReactDOM.render(<App />, document.getElementById('app'))