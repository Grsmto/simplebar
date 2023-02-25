import React from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';
import './App.css';
import Playground from './Playground';

const App = () => {
  return (
    <div className="App">
      <Playground width height direction>
        {({ height, width, direction }) => (
          <div style={{ height: '200px', width: '100px', direction }}>
            <SimpleBar style={{ height, width }}>
              {[...Array(50)].map((x, i) => (
                <p key={i} className="odd">
                  Some content
                </p>
              ))}
            </SimpleBar>
          </div>
        )}
      </Playground>
    </div>
  );
};

export default App;
