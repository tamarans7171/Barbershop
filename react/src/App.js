import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarClient from './components/clients/navbar/navbar';
import { Outlet } from 'react-router-dom'

function App() {
console.log("jjjjjjjjjjjjjjjj");

  return (
    <div className="App" >


      <NavbarClient></NavbarClient>
      <Outlet />
    </div>
  );
}

export default App;
