import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//setup store
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import CartLoader from './components/CartLoader.js';

//import for deploy
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if(process.env.NODE_ENV === 'production') disableReactDevTools();


// store to persit
const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={<CartLoader />} persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>
);

reportWebVitals();
