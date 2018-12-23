import React from 'react';

import RelatedItem from './RelatedItem.jsx';

const RelatedItemList = (props) => {

    let mapped = props.relatedItems.map(element => {
        console.log(element);
        return <RelatedItem relatedItemData={element}/>
    })
    return (
        <div>Hello there
            <ol>
                {mapped};
            </ol>
        </div>
    )
}

export default RelatedItemList;