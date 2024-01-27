import {React} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './components/Main';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Profile from './components/Profile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Main />
    <Profile/>
  </React.StrictMode>
);

reportWebVitals();
