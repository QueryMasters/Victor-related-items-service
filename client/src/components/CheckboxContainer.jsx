import React from 'react';

const CheckboxContainer = (props) => {
    let mappedItems = [];
    if (props.frequentItems !== undefined && props.frequentItems.length > 0) {
        mappedItems = props.frequentItems.map((element, i) => {
            if (i === 0) {
                return  <div key={i}>
                            <input type="checkbox" value="test" checked={element.checked} onChange={() => {props.checkHandler(element.id)}}/>
                            <label className={element.checked ? "checkbox-label" : "grayed-out"}>
                                This item: {element.itemName} ${element.price}
                            </label>
                        </div> 
            } else {
                return  <div key={i}>
                            <input type="checkbox" value="test" checked={element.checked} onChange={() => {props.checkHandler(element.id)}}/>
                            <label className={element.checked ? "" : "grayed-out"}>
                                <a href="#" className={element.checked ? "" : "grayed-out"} onClick={()=>{props.itemClick(element.id)}} >
                                    {element.itemName}
                                </a>  ${element.price}
                            </label>
                        </div>
            }
        });

    }

    return (
        <div>
            Checkbox
            <form action="">
                {mappedItems}
            </form>
        </div>
    )
}

export default CheckboxContainer;