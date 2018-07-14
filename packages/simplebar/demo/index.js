import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';

import 'simplebar/src/simplebar.css';

function menuRenderer(params) {
    // use default renderer in a hacky way
    const menu = Select.defaultProps.menuRenderer(params);

    return <SimpleBar>{menu}</SimpleBar>;
}

ReactDOM.render(
    <section>
        <h1>Simplebar demo page</h1>
        <section>
            <div className="col">
                <h2>Default</h2>
                <div id="demo1" className="demo1" data-simplebar>
                    {[...Array(50)].map((x, i) =>
                        <p key={i} className="odd">Some content</p>
                    )}
                </div>
            </div>
            <div className="col">
                <h2>autoHide false</h2>
                <div id="demo2" className="demo1" data-simplebar data-simplebar-auto-hide="false">
                    {[...Array(10)].map((x, i) =>
                        <p key={i} className="odd">Some content</p>
                    )}
                </div>
            </div>
        </section>
        <section>
            <div className="col">
                <h2>forceVisible true</h2>
                <div id="demo3" className="demo1" data-simplebar data-simplebar-force-visible>
                    {[...Array(5)].map((x, i) =>
                        <p key={i} className="odd">Some content</p>
                    )}
                </div>
            </div>
            <div className="col">
                <h2>direction RTL</h2>
                <div 
                    className={"demo4"} 
                    style={{ width: '200px', direction: 'rtl' }} 
                    data-simplebar
                    data-simplebar-direction="rtl"
                >
                    <div className={"box"}>1</div>
                    <div className={"box"}>2</div>
                    <div className={"box"}>3</div>
                    <div className={"box"}>4</div>
                    <div className={"box"}>5</div>
                </div>
            </div>
        </section>
        <section>
            <div className="col">
                <h2>React-Select</h2>
                <Select
                    menuRenderer={menuRenderer}
                    options={[...Array(50)].map((x, i) => ({ value: i, label: i }))}
                />
            </div>
            <div className="col">
                <h2>Horizontal</h2>
                <div
                    className={"demo4"}
                    style={{ width: '200px' }}
                    data-simplebar
                >
                    <div className={"box"}>1</div>
                    <div className={"box"}>2</div>
                    <div className={"box"}>3</div>
                    <div className={"box"}>4</div>
                    <div className={"box"}>5</div>
                </div>
            </div>
        </section>
    </section>,
    document.getElementById('root')
);

// var demo5 = new SimpleBar(document.getElementById('demo5'));