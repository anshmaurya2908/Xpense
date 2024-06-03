import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import delete_img from '../assets/delete_img.png';
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

const ContactDetails = () => {
  const location = useLocation();
  const { contact } = location.state;
  const [expenselist, setExpenseList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newexpense, setNewExpense] = useState({
    "amount": 0,
    "category": "food",
    "description": "",
  });

  const fetchExpenseList = async () => {
    console.log('fetch Expenses Called');
    try {
      const fetchededContact = await axios.post(`${baseUrl}/contact`,
        {
          contactId: contact._id
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      setExpenseList(fetchededContact.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenseList();
  }, []);

  const handleExpenseChange = (event) => {
    setNewExpense({ ...newexpense, [event.target.name]: event.target.value });
  };

  const handleAddExpense = async () => {
    try {
      await axios.post(`${baseUrl}/addexpense`, {
        amount: newexpense.amount,
        category: newexpense.category,
        description: newexpense.description,
        contactId: contact._id,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      // Refresh the expense list
      await fetchExpenseList();
      setShowForm(false);
      setNewExpense({ "amount": 0, "category": "food", "description": "" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleRemoveExpense = async (expenseId) => {
    let confirm = window.confirm(`Remove this from this Expense list`);
    if (!confirm) return;
    try {
      await axios.post(`${baseUrl}/removeexpense`,
        {
          expenseId: expenseId,
          contactId: contact._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      // Refresh the expense list
      await fetchExpenseList();
    } catch (error) {
      console.error("Error removing expense:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mutual Expenses with {contact.name}</h2>
      <div className="mb-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Expense No.</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {expenselist.map((expense, index) => (
              <tr key={expense._id}>
                <td className="py-2 px-4 border-b">Expense {index + 1}</td>
                <td className="py-2 px-4 border-b">{expense.amount}</td>
                <td className="py-2 px-4 border-b">{expense.category}</td>
                <td className="py-2 px-4 border-b">{expense.description}</td>
                <td className="py-2 px-4 border-b">
                  <img src={delete_img} alt="remove"
                    onClick={() => { handleRemoveExpense(expense._id) }}
                    className="cursor-pointer"
                    style={{ width: '20px', height: '20px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm ? (
        <>
          <div className="mb-4">
            <p className="block text-sm font-medium mb-2 text-gray-700">Category</p>
            <select value={newexpense.category} name="category" onChange={handleExpenseChange} className="p-2 border rounded-md">
              <option value="food">Food</option>
              <option value="udhar">Udhar</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="other">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" placeholder='Add some description' onChange={handleExpenseChange} className="mt-1 p-2 border rounded-md resize"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" name="amount" placeholder='Enter amount with sign' onChange={handleExpenseChange} className="mt-1 p-2 border rounded-md" />
          </div>
          <button onClick={handleAddExpense} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          <button onClick={() => { setShowForm(false); setNewExpense({ "amount": 0, "category": "food", "description": "" }) }} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Add New Expense
        </button>
      )}
    </div>
  );
};
export default ContactDetails;
