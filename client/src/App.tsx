import * as React from 'react';

import './App.css';
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  // Code returned by spotify API during auth
  const code = new URLSearchParams(window.location.search).get('code');
  return (
    code ?
      <Dashboard code={code} /> :
      <Login />
  )
}

export default App;
