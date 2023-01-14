import 'core-js/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Demo from './Demo';

const root = createRoot(document.getElementById('root'));
root.render(<Demo />);
