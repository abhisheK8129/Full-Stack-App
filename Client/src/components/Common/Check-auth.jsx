import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const CheckTheAuthentication = ({
  isUserAuthenticated,
  user,
  children,
}) => {
  const location = useLocation();
  console.log(location);
  

  // if the location is '/' then 
  if(location.pathname === '/'){
    // if the user is not authenticated then return the user to the login page
    if(!isUserAuthenticated){
      return <Navigate to='/auth/login'/>
    }
    // if the user is authenticated then check the role of the user is admin then go the admin page and if the user role is not admin then go to the shopping page
    else{
      
      if(user?.role === 'admin'){
        return <Navigate to='/admin/dashboard'/>
      }
      else{
        return <Navigate to='/shopping/home' />
      }
    }

  }

  //   when the user is not authenticated or not login or not register itself

  if (
    !isUserAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // when the user is authenticated and logged in or registered itself
  if (isUserAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){

    // if the user role is admin then return to the admin page
    if (user?.role === "admin") { 
      return <Navigate to="/admin/dashboard" />;
    }
    // else return to the shopping page
    else {
      return <Navigate to="/shopping/home" />;
    }
  }

  // when the user is authenticated and user is not admin and is trying to access the admin page
  if (
    isUserAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    // return to the unauthorized page
    return <Navigate to="/unauth-page" />;
  }

  // when the user is authenticated and user role is admin and is trying to access the shopping page
  if (isUserAuthenticated && user?.role === "admin" && location.pathname.includes("shopping")) {
    // return to the admin page
    return <Navigate to="/admin/dashboard" />;
  } 
  else{
    return <>{children}</>
  }
};
