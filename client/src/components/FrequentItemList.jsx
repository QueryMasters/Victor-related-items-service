import React from 'react';
import FrequentImages from './FrequentImages.jsx';
import CheckboxContainer from './CheckboxContainer.jsx';

const FrequentItemList = (props) => {
    return (
        <div className="frequent-item-list">
            <div className="frequent-item-title">Frequently bought together</div> 
            {/* <ItemsCart frequentItems={props.frequentItemsInfo}/> */}
            <FrequentImages frequentItems={props.frequentItemsInfo} />
            <CheckboxContainer frequentItems={props.frequentItemsInfo} checkHandler={props.checkHandler} itemClick={props.itemClick}/>

        </div>
    )
} 

export default FrequentItemList;