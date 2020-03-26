import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from "../src/Components/App/App";
import reducers from "./reducer"
import {fetchData} from "./actions/index"

const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(fetchData());

const rootElement = document.getElementById("root");

const root = <Provider store={store}>
<App />
</Provider>;

ReactDOM.render(root, rootElement);
