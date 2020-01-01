import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './style/jointjs.css';
import './style/animate.css';
import './style/components.css';
import './style/normalize.css';
import './style/custom.css';
import './style/index.css'
import "bootstrap/dist/css/bootstrap.min.css";

import configureStore from './redux/store/configureStore';
import App from './app';


ReactDOM.render((
    <Provider store={configureStore()}>
        <App/>
    </Provider>
), document.getElementById('root'));
