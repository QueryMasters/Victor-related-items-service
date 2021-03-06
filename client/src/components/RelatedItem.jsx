import React from 'react';

const RelatedItem = (props) => {
    let numStarsClass = 'stars star-' + props.relatedItemData.averageStarRating.toString();
    
    return (
        
            <li className = "related-item">
                <div>
                    <img src={props.relatedItemData.image} className="item-image"/>
                </div>
                <div>
                    <a href="#" onClick={() => {props.itemClick(props.relatedItemData.id)}}>{props.relatedItemData.itemName}</a>
                </div>
                <span className="stars-span">
                    <div className={numStarsClass}></div>
                    <div>{props.relatedItemData.numberOfReviews}</div>
                </span>
                <span className="price-prime-span">
                    <div>${props.relatedItemData.price}</div>
                    {props.relatedItemData.availableOnPrime &&
                        <div className="amazon-prime-icon"></div>
                    
                    }
                </span>
            </li>
        
    )
}

export default RelatedItem;