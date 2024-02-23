import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import GroupDashboard from './pages/GroupDashboard.jsx';
import './css/App.css';
import './css/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <GroupDashboard />
  </React.StrictMode>
);
