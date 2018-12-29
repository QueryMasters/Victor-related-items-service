import React from 'react';
import FrequentImages from './FrequentImages.jsx';
import CheckboxContainer from './CheckboxContainer.jsx';

const FrequentItemList = (props) => {
    return (
        <div className="frequent-item-list">
            Frequently bought together
            {/* <ItemsCart frequentItems={props.frequentItemsInfo}/> */}
            <FrequentImages frequentItems={props.frequentItemsInfo} />
            <CheckboxContainer frequentItems={props.frequentItemsInfo} checkHandler={props.checkHandler} itemClick={props.itemClick}/>

        </div>
    )
} 

export default FrequentItemList;