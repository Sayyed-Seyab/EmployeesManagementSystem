import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
// import EmployeesForm from "./Components/EmployeesForm";
// import { ToastContainer } from "react-toastify";
// import AllEmployeesData from './Components/AllEmployeesData'
// import AccountDetails from './Components/AccountDetails'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';

function App() {
  
  return <AppRoutes />;
   <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
}

export default App;
