import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesCompon from './routes/RoutesCompon';
import Auth from './context/contextAuth';
import {hasAuthenticated} from './context/AuthApi';
import './styles/App.css';

const  App = (props) => {
  const[isAuthenticated,setIsAuthenticated] = useState(hasAuthenticated);  
  const [token, setToken]= useState('');
  const [userId, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken, userId,setUserId,isAdmin,setIsAdmin }}>
      <div className="App">
        <RoutesCompon />      
      </div>
    </Auth.Provider> 
  );
}

export default App;
