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
    </div>
  );
}

export default Dashboard;
