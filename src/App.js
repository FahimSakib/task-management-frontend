import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import axios from 'axios';
import CreateTask from './pages/CreateTask';
import ViewTask from './pages/ViewTask';
import EditTask from './pages/EditTask';
import AccessDenied from './pages/AccessDenied';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    // eslint-disable-next-line eqeqeq
    sessionStorage.getItem('loggedIn') == 'true' || false
  );

  const setSessionLogin = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8000'

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setLoggedIn={setLoggedIn} />}>
          <Route index element={<Home loggedIn={loggedIn} />} />
          <Route path="/create-task" element={<CreateTask loggedIn={loggedIn} />} />
          <Route path="/view-task/:id" element={<ViewTask loggedIn={loggedIn} />} />
          <Route path="/edit-task/:id" element={<EditTask loggedIn={loggedIn} />} />
        </Route>
        <Route path="/login" element={<Login setSessionLogin={setSessionLogin} />} />
        <Route path="/register" element={<Register setSessionLogin={setSessionLogin} />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
