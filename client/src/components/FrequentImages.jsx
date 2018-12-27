import React from 'react';

const FrequentImages = (props) => {
    let mappedImages = [];
    if (props.frequentItems !== undefined && props.frequentItems.length > 0) {
        mappedImages = props.frequentItems.map((element, index) => {
            // console.log(element);
            if(element.checked) {
                return <img src={element.image} className="item-image" key={index}/>

            }
        });

    }
    // console.log('the mapped images are ',mappedImages, 'the frequent image', props.frequentItems[0].image);
    return (
        <div>
            {mappedImages}
        </div>
    )
}

export default FrequentImages;

