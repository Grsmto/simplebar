import React from 'react';
import ReactDOM from 'react-dom';
import 'SimpleBar';


ReactDOM.render(
    <div className={"demo4"} data-simplebar>
        <div className={"box"}>1</div>
        <div className={"box"}>2</div>
        <div className={"box"}>3</div>
        <div className={"box"}>4</div>
        <div className={"box"}>5</div>
    </div>,
    document.getElementById('root')
);

// var demo5 = new SimpleBar(document.getElementById('demo5'));