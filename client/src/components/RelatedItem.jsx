import React from 'react';

const RelatedItem = (props) => {
    // console.log(props.relatedItemData);
    return (
        <div>
            <li className = "related-item">
                <div><img src={props.relatedItemData.image} className="related-item-image"/></div>
                <div><a href="#">{props.relatedItemData.itemName}</a></div>
                <div>Average Stars: {props.relatedItemData.averageStarRating}</div>
                <div>Number of Reviews: {props.relatedItemData.numberOfReviews}</div>
                <div>Price: {props.relatedItemData.price}</div>
            </li>
        </div>
    )
}

export default RelatedItem;