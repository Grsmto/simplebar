import 'core-js/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ResizeObserver } from '@juggle/resize-observer';
import 'intersection-observer';

import App from './App';

window.ResizeObserver = ResizeObserver;

const root = createRoot(document.getElementById('root'));
root.render(<App />);
