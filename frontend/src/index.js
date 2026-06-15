import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from './context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import './style/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
);

