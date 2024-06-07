import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContacts from './UserContacts';
import ContactDetails from './ContactDetails';
import ExpensePage from './ExpensePage';
import History from './History';
import Analytics from './Analytics';

const Dashboard = () => {
  return (
    <div className="flex">
      <UserContacts />
      <div className="flex-grow">
        <Routes>
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/contactdetails" element={<ContactDetails />} />
          <Route path="/dashboard/expensepage" element={<ExpensePage />} />
          <Route path="/dashboard/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
