import { useState } from 'react';
import './App.css';
import Login from './components/login';
import DataProvider from './context/Dataprovider';
import Home from './components/home';
import {BrowserRouter , Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import CreatePost from './components/CreatePost';
import DetailView from './components/DetailView';
import Update from './components/Update';


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

              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                 <Route path="/create" element={<CreatePost/>} />
              </Route>

              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                 <Route path="/details/:id" element={<DetailView/>} />
              </Route>

              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                 <Route path="/update/:id" element={<Update/>} />
              </Route>

            </Routes>  
          </div>
        </BrowserRouter>
      </DataProvider>
    
  );
}

export default App; 
