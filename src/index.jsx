import React,{ useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import "./style/index.css";
import App from './App/App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { HelmetProvider } from 'react-helmet-async';
const AppContainer=({})=>{
    return(<>
        <React.StrictMode>
            <HelmetProvider>
                <Provider store={store}>
                    <div id="titlebar">
                        <h1>Todura V2</h1>
                        <div id="itemContainer">
                            <div className="item" id="close" onClick={(e)=>{
                                e.preventDefault();window.toduraApi.close();}}><i className="fa-solid fa-xmark"></i></div>
                            <div className="item" id="maximize" onClick={(e)=>{
                                e.preventDefault();window.toduraApi.max();}}><i className="fa-solid fa-expand"></i></div>
                            <div className="item" id="minimize"onClick={(e)=>{
                                e.preventDefault();window.toduraApi.min();}}><i className="fa-solid fa-minus"></i></div>
                        </div>
                    </div>
                    <App/>
                </Provider>
            </HelmetProvider>
        </React.StrictMode>
    </>);
}
createRoot(document.getElementById('root')).render(<AppContainer/>);
