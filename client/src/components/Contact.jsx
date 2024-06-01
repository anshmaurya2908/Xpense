import React, { useEffect, useState } from 'react';
import axios from 'axios';
import delete_img from '../assets/delete_img.jpg';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:8000';

// Component for adding input boxes to add new contacts.
const AddNewContact = ({ fetchContacts, setVisible }) => {
  const [details, setDetails] = useState({
    name: "",
    number: "",
  });

  const handleChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(`${baseUrl}/addcontact`,
      JSON.stringify({
        name: details.name,
        number: details.number,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    setDetails({ name: "", number: "" });
    fetchContacts();
    setVisible(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <input
          className="border text-black border-gray-300 rounded-md px-3 py-2"
          value={details.name}
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />
        <input
          className="border text-black border-gray-300 rounded-md px-3 py-2"
          value={details.number}
          type="text"
          name="number"
          placeholder="Enter Number"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={() => setVisible(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

const removeContact = async (contact, fetchContacts) => {
  let confirm = await window.confirm(`Remove ${contact.name} from the user friend list`);
  if (!confirm) {
    return;
  }
  await axios.post(`${baseUrl}/removecontact`,
    JSON.stringify({ id: contact._id }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  ).then(() => fetchContacts());
};

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchContacts = async () => {
    await axios.get(`${baseUrl}/user/contacts`, {
      withCredentials: true,
    }).then(res => res.data)
      .then(data => data.contactList)
      .then(contactList => contactList.contacts)
      .then(contacts => setContacts(contacts));
  };

  useEffect(() => {
    fetchContacts();
  }, [contacts]);

  const Total = (expenses) => {
    let val = 0;
    expenses.map((expense) => val += expense.amount);
    return val;
  };

  const navigate = useNavigate();
  const handleContactDetails = (contact) => {
    navigate('/contactdetails', { state: { contact: contact } });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6">Contacts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-80 bg-white text-black border border-gray-300 mx-5" style={{ width: '90%' }}>
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Number</th>
              <th className="py-2 px-4 border-b">Total Expense</th>
              <th className="py-2 px-4 border-b">Remove</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td
                  className="py-2 px-4 border-b cursor-pointer"
                  onClick={() => handleContactDetails(contact)}
                >
                  {contact.name}
                </td>
                <td className="py-2 px-4 border-b">{contact.number}</td>
                <td className="py-2 px-4 border-b">{Total(contact.expenses)}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={delete_img}
                    onClick={() => removeContact(contact, fetchContacts)}
                    alt="remove"
                    className="cursor-pointer"
                    style={{ width: '20px', height: '20px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {visible ? (
          <AddNewContact fetchContacts={fetchContacts} setVisible={setVisible} />
        ) : (
          <button
            onClick={() => setVisible(!visible)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Contacts
          </button>
        )}
      </div>
    </div>
  );
}

export default Contact;
