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

        // if (filteredImages.length > 1) {
        //     mappedImages = filteredImages.map((element, index) => {
        //         if(true) {

        //         }
        //     })
        // }

        mappedImages = props.frequentItems.map((element, index) => {
            if(element.checked) {
                return <img src={element.image} className="item-image" key={index}/>
                
            }
        });
        console.log(mappedImages);
        // if (mappedImages.length > 1) {
        //     mappedImages.split('').join('+');
        // }

    }
    return (
        <div className="frequent-images">
            {mappedImages}
            <ItemsCart frequentItems={props.frequentItems}/>
        </div>
    )
}

export default FrequentImages;

