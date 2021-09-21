import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";


import register from "./registerServiceWorker";
import {Provider} from "react-redux";
import {store} from "./store";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)
;
register()
