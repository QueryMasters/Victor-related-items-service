import React from 'react';

const CheckboxContainer = (props) => {
    let mappedItems = [];
    if (props.frequentItems !== undefined && props.frequentItems.length > 0) {
        mappedItems = props.frequentItems.map((element, i) => {
            if (i === 0) {
                return <div key={i}><input type="checkbox" value="test" checked={element.checked} onChange={() => {props.checkHandler(element.id)}}/><label>This item: {element.itemName} ${element.price} ID: {element.id}</label></div> 
            } else {
                return <div key={i}><input type="checkbox" value="test" checked={element.checked} onChange={() => {props.checkHandler(element.id)}}/><label><a href="#" onClick={()=>{props.itemClick(element.id)}}>{element.itemName}</a>  ${element.price} ID: {element.id}</label></div>
            }
        });

    }

    return (
        <div>
            Checkbox
            <form action="">
                {/* <input type="checkbox" value="test"/> */}
                {/* <label>test</label> */}
                {mappedItems}
            </form>
        </div>
    )
}

export default CheckboxContainer;