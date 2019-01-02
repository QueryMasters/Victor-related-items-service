import React from 'react';

import ItemsCart from './ItemsCart.jsx';
import { fileURLToPath } from 'url';

const FrequentImages = (props) => {
    let mappedImages = [];
    let filteredImages = [];
    if (props.frequentItems !== undefined && props.frequentItems.length > 0) {

        filteredImages = props.frequentItems.filter(el => {
            return el.checked === true;
        });

        mappedImages = filteredImages.map((element, index) => {
            if (filteredImages.length > 1 && index !== filteredImages.length - 1) {
                return  <div className="item-plus" key={index}>
                            <img src={element.image} className="item-image" key={index}/>
                            <div>+</div>
                        </div> 
            } else {
                return <img src={element.image} className="item-image" key={index}/>
            }
        });

    }
    return (
        <div className="frequent-images">
            {mappedImages}
            <ItemsCart frequentItems={props.frequentItems}/>
        </div>
    )
}

export default FrequentImages;

