import React from 'react';

import RelatedItem from './RelatedItem.jsx';

const RelatedItemList = (props) => {

    let mapped = props.relatedItemInfo.map(element => {
        return <RelatedItem relatedItemData={element}/>
    })
    return (
        <div>Customers also bought:
            <ol>
                {mapped}
            </ol>
        </div>
    )
}

export default RelatedItemList;