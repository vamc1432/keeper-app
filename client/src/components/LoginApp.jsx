import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import App from "./App";
import useToken from "./useToken";

function LoginApp() {

  const {token, setToken} = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div>
      <App />
    </div>
  );
}
export default LoginApp;