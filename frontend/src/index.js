import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store={ store }>
  <App />
</Provider>
, document.getElementById('root'));
registerServiceWorker();
