import React from 'react';
import Select from 'react-select';
import ReactSimpleBar from 'simplebar-react';
import SimpleBar from 'simplebar';

import Playground from 'simplebar/demo/Playground';

import 'react-select/dist/react-select.css';
import 'simplebar/src/simplebar.css';

import './browser/css/demo.css';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

function menuRenderer(params) {
  // use default renderer in a hacky way
  const menu = Select.defaultProps.menuRenderer(params);

  return <ReactSimpleBar>{menu}</ReactSimpleBar>;
}

class Demo extends React.Component {
  componentDidMount() {
    new SimpleBar(document.getElementById('manual-instantiation'));
    new SimpleBar(document.getElementById('with-classnames'), {
      classNames: { vertical: 'my-custom-class' }
    });
  }

  render() {
    return (
      <section>
          <h1>Simplebar demo page</h1>
          <section>
              <div className="col">
                  <h2>Default</h2>
                  <div id="demo1" className="demo1" data-simplebar>
                      <h3 className="sticky">Sticky header</h3>
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
                      className={"demo4 demo-rtl"}
                      style={{ width: '200px', direction: 'rtl' }}
                      data-simplebar
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
                      {({ height, width, direction }) => (
                          <div
                              style={{
                                  width: '200px',
                                  height: '200px'
                              }}
                          >
                              <div
                                  data-simplebar
                                  className="demo4"
                                  style={{ height, width, direction }}
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
                  <h2>Manual instantiation</h2>
                  <div
                      id="manual-instantiation"
                      className="demo4"
                      style={{ width: '200px' }}
                  >
                      <div className="box">1</div>
                      <div className="box">2</div>
                      <div className="box">3</div>
                      <div className="box">4</div>
                      <div className="box">5</div>
                  </div>
              </div>
              <div className="col">
                  <h2>Horizontal native</h2>
                  <div
                      className="demo4"
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
                      className="demo-both-axis"
                      data-simplebar
                  >
                      <div className="box">1</div>
                  </div>
              </div>
              <div className="col">
                  <h2>Both axis + padding</h2>
                  <div
                      className="demo-both-axis demo-both-axis--padding"
                      data-simplebar
                  >
                      <div className="box">1</div>
                  </div>
              </div>
          </section>
          <section>
              <div className="col">
                  <h2>Both axis + padding native</h2>
                  <div
                      className="demo-both-axis demo-both-axis--padding"
                  >
                      <div className="box">1</div>
                  </div>
              </div>
              <div className="col">
                <h2>Y axis only</h2>
                <div
                  className="demo-y-axis"
                  data-simplebar
                >
                  <div className="box">1</div>
                </div>
              </div>
          </section>
        <section>
          <div className="col">
            <h2>With custom classnames</h2>
            <div
              id="with-classnames"
              className="demo4"
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
      </section>
    );
  }
}

export default Demo;
