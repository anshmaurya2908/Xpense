import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ContactDetails from './components/ContactDetails';
import ExpensePage from './components/ExpensePage';
import History from './components/History';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="contactdetails" element={<ContactDetails />} />
            <Route path="expensepage" element={<ExpensePage />} />
            <Route path="history" element={<History/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
