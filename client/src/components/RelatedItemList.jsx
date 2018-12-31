import React from 'react';

import RelatedItem from './RelatedItem.jsx';
import Arrow from './Arrow.jsx';

const RelatedItemList = (props) => {
    let totalPages = 0;
    let mapped = [];

    if (props.relatedItemsCurrent !== undefined && props.relatedItemsCurrent.length > 0) {
        let current = props.relatedItemsCurrent[props.currentArr];
        mapped = current.map((element, i) => {
            return <RelatedItem relatedItemData={element} itemClick={props.itemClick} key={i}/>
        });       
        totalPages = props.relatedItemsCurrent.length;
    }

    return (
        <div className="related-items-list">
        <span className="relate-items-title">Customers also bought:</span> 
            <div className="page-number">
                {totalPages > 1 && props.currentPage !== 0 ? (
                    <div className="current-page">Page {props.currentPage + 1} of {totalPages} <span className="text-separator">|</span> <a href="#" className="start-over" onClick={props.startOver}>Start over</a> </div>
                ) : (
                    <div className="current-page">Page {props.currentPage + 1} of {totalPages}</div>
                )}
            </div>
            <div className="related-items-span">
                <Arrow arrowClick={props.arrowClick} direction='left'/>
                <div className = "related-item-carousel">
                    <ol>
                        {mapped}
                    </ol>
                </div>
                <Arrow arrowClick={props.arrowClick} direction='right'/>
                
            </div>
        </div>
    )
}

export default RelatedItemList;