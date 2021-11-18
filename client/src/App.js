import './App.css';
// TODO: #15 write component files with capital letter
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";

function App() {
  // Code returned by spotify API during auth
  const code = new URLSearchParams(window.location.search).get('code');

  return code ? <Dashboard code={code} /> : <Login />
}

export default App;
