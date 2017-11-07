import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './view/Main';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
