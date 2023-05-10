// index.js NEEDS TO STAY OUT IN THE SOURCE FOLDER SO THAT IT IS ABLE TO LINK UP WITH index.html IN THE PUBLIC FOLDER
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
)