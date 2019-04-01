import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
