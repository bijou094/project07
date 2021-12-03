import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesCompon from './components/RoutesCompon';
import Auth from './pages/contextAuth';
import {hasAuthenticated} from './AuthApi'

import './styles/App.css';



function App(props) {
  const[isAuthenticated,setIsAuthenticated] = useState(hasAuthenticated);
  const [token, setToken]= useState('');
  const [userId, setUserId] = useState('');



  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken, userId,setUserId }}>
      <div className="App">
        <RoutesCompon />      
      </div>
    </Auth.Provider> 
  );
}

export default App;
