import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';

import 'react-select/dist/react-select.css';
import 'simplebar/src/simplebar.css';

function menuRenderer(params) {
    // use default renderer in a hacky way
    const menu = Select.defaultProps.menuRenderer(params);

    return <SimpleBar>{menu}</SimpleBar>;
}

class Playground extends React.PureComponent {
    state = {
        height: '100%',
        width: '100%'
    }

    render() {
        return (
            <Fragment>
                {this.props.children(this.state)}
                <div>
                    <label>Width:</label>
                    <Select
                        onChange={(option) => this.setState({ width: option.value })}
                        options={[
                            { value: 'auto', label: 'auto' },
                            { value: '100%', label: '100%' }
                        ]}
                        value={this.state.width}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <Select
                        onChange={(option) => this.setState({ height: option.value })}
                        options={[
                            { value: 'auto', label: 'auto' },
                            { value: '100%', label: '100%' }
                        ]}
                        value={this.state.height}
                    />
                </div>
            </Fragment>
        );
    }
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
                    <div className="box">1</div>
                    <div className="box">2</div>
                    <div className="box">3</div>
                    <div className="box">4</div>
                    <div className="box">5</div>
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
                <Playground>
                    {({ height, width }) => (
                        <div 
                            style={{
                                width: '200px',
                                height: '200px'
                            }}
                        >
                            <div
                                data-simplebar
                                className="demo4"
                                style={{ height, width }}
                            >
                                <div className="box">1</div>
                                <div className="box">2</div>
                                <div className="box">3</div>
                                <div className="box">4</div>
                                <div className="box">5</div>
                            </div>
                        </div>
                    )}
                </Playground>
            </div>
        </section>
        <section>
            <div className="col">
                <h2>Horizontal</h2>
                <div
                    className={"demo4"}
                    style={{ width: '200px' }}
                    data-simplebar
                >
                    <div className="box">1</div>
                    <div className="box">2</div>
                    <div className="box">3</div>
                    <div className="box">4</div>
                    <div className="box">5</div>
                </div>
            </div>
            <div className="col">
                <h2>Horizontal</h2>
                <div
                    className={"demo4"}
                    style={{ width: '200px' }}
                >
                    <div className="box">1</div>
                    <div className="box">2</div>
                    <div className="box">3</div>
                    <div className="box">4</div>
                    <div className="box">5</div>
                </div>
            </div>
        </section>
        <section>
            <div className="col">
                <h2>Both axis</h2>
                <div
                    className={"demo-both-axis"}
                    data-simplebar
                >
                    <div className="box">1</div>
                </div>
            </div>
            <div className="col">
                <h2>Both axis + padding</h2>
                <div
                    className={"demo-both-axis demo-both-axis--padding"}
                    data-simplebar
                >
                    <div className="box">1</div>
                </div>
            </div>
        </section>
        <section>
            <div className="col">
                <h2>Both axis + padding</h2>
                <div
                    className={"demo-both-axis demo-both-axis--padding"}
                >
                    <div className="box">1</div>
                </div>
            </div>
        </section>
    </section>,
    document.getElementById('root')
);

// var demo5 = new SimpleBar(document.getElementById('demo5'));

