import { useState } from 'react';
import './App.css';
import Login from './components/login';
import DataProvider from './context/Dataprovider';
import Home from './components/home';
import {BrowserRouter , Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/header';


const PrivateRoute = ({isAuthenticated , ...props}) => {
    
  return isAuthenticated ?
  <>
    <Header />
    <Outlet />
  </>
  : <Navigate replace to="/login" />
}

function App() {

  const [isAuthenticated , isUserAuthenticated ] = useState(false);

  return (
    
      <DataProvider>
        <BrowserRouter>
          
          <div style={{marginTop: 64}}>
            <Routes>
              <Route path="/login" element={<Login  isUserAuthenticated={isUserAuthenticated} />} />

              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                 <Route path="/" element={<Home/>} />
              </Route>
            </Routes>  
          </div>
        </BrowserRouter>
      </DataProvider>
    
  );
}

export default App; 
