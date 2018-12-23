import React from 'react';

const RelatedItem = (props) => {
    console.log(props.relatedItemData);
    return (
        <div>
            <li>
                <div>props.relatedItemData.</div>
            </li>
        </div>
    )
}

export default RelatedItem;