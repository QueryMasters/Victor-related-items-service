import React from 'react';
import FrequentImages from './FrequentImages.jsx';
import CheckboxContainer from './CheckboxContainer.jsx';

const FrequentItemList = (props) => {
    console.log(props)
    return (
        <div className="frequent-item-list">
            <div className="frequent-item-title">Frequently bought together</div> 
            <FrequentImages frequentItems={props.frequentItemsInfo} />
            <CheckboxContainer frequentItems={props.frequentItemsInfo} checkHandler={props.checkHandler} itemClick={props.itemClick}/>

        </div>
    )
} 

export default FrequentItemList;