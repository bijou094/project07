import React from 'react';

export default  React.createContext({
    token : '',
    setToken:value =>{},
    userId:'',
    setUserId:value =>{},
    isAuthenticated : false,
    setIsAuthenticated:value =>{}
    
});