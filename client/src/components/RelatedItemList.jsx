import React from 'react';

import RelatedItem from './RelatedItem.jsx';
import Arrow from './Arrow.jsx';

const RelatedItemList = (props) => {
    // console.log('from RelatedItemList', props.relatedItemsCurrent);
    let mapped = [];
    if (props.relatedItemsCurrent !== undefined && props.relatedItemsCurrent.length > 0) {
        let current = props.relatedItemsCurrent[props.currentArr];
        // console.log('current is', current, 'props.relatedItemsCurrent are ', props.relatedItemsCurrent);
        mapped = current.map(element => {
            return <RelatedItem relatedItemData={element}/>
        })
    }
    return (
        <div>Customers also bought:
            <span>
                <Arrow arrowClick={props.arrowClick} direction='left'/>
                <div className = "related-item-carousel">
                    <ol>
                        {mapped}
                    </ol>
                </div>
                <Arrow arrowClick={props.arrowClick} direction='right'/>
            </span>
        </div>
    )
}

export default RelatedItemList;