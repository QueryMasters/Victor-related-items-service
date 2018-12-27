import React from 'react';
import FrequentImages from './FrequentImages.jsx';
import ItemsCart from './ItemsCart.jsx';
import CheckboxContainer from './CheckboxContainer.jsx';


//I don't think that this should be a stateful component
// class FrequentItemList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             frequentItems: this.props.frequentItemsInfo,
//         } 
//     }

//     componentDidUpdate() {
//         this.setState({
//             frequentItems: this.props.frequentItemsInfo
//         });
//     }    

//     render() {
//         console.log(this.props.frequentItemsInfo);
//         console.log(this.state.frequentItems);
//         return (
//             <div className="frequent-item-list">
//                 Frequently bought together
//                 <FrequentImages />
//                 <ItemsCart />
//                 <Checkbox />

//             </div>
//         )
//     }
// }

const FrequentItemList = (props) => {
    return (
        <div className="frequent-item-list">
            Frequently bought together
            <ItemsCart frequentItems={props.frequentItemsInfo}/>
            <FrequentImages frequentItems={props.frequentItemsInfo} />
            <CheckboxContainer frequentItems={props.frequentItemsInfo} checkHandler={props.checkHandler} itemClick={props.itemClick}/>

        </div>
    )
} 

export default FrequentItemList;