import React from 'react';
import {Route, Redirect } from "react-router-dom";

const ProtectedRoute =({isAuth:isAuth,component:Component, ...rest}) => (
        <Route {...rest} render={(props)=>(
             isAuth ?  <Component/> : <Redirect to= {{pathname : '/', state: {from: props.location}}}/>
               )} />
            );





export default ProtectedRoute;