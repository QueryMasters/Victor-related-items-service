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
                <span>
                    <div>Price: {props.relatedItemData.price}</div>
                    {/* <div>Avail on P? {props.relatedItemData.availableOnPrime}</div> */}
                </span>
            </li>
        </div>
    )
}

export default RelatedItem;