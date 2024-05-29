import React, { useEffect, useState } from 'react';
import axios from 'axios';
import delete_img from '../assets/delete_img.jpg'
const baseUrl='http://localhost:8000';
//component for adding input boxes to 
// add new contacts.
const AddNewContact = ({fetchContacts ,setVisible}) => {
  const [details,setDetails]=useState({
    name:"",
    number:"",
  })
  const handleChange =(event)=>{
    setDetails({...details,[event.target.name]:event.target.value});
  }
  // function to be implemented
  const handleSubmit=async()=>{
   await axios.post(`${baseUrl}/addcontact`, 
      JSON.stringify({
        name: details.name,
        number: details.number,
      }), 
      {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });
    setDetails({name:"",number:""});
    fetchContacts();
    setVisible(false);
  }
  return(
    <>
   <div className="grid grid-cols-2 gap-4">
      <input className="border text-black border-gray-300 rounded-md px-3 py-2" value={details.name} 
      type="text" name="name" placeholder="Enter Name"onChange={handleChange}/>
      <input className="border text-black border-gray-300 rounded-md px-3 py-2"value={details.number}
      type="text"name="number"placeholder="Enter Number"onChange={handleChange}/>
    </div>
    <div className="mt-4">
      <button onClick={handleSubmit} className="bg-blue-500 text-black-700 px-4 py-2 rounded-md mr-2 hover:bg-blue-600">Save</button>
      <button onClick={() => setVisible(false)}className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
    </div>
    </>
  )
}
const removeConatct=async(contactID,fetchContacts)=>{
  await axios.post(`${baseUrl}/removecontact`,
    JSON.stringify({id:contactID}),
    {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
  })
  .then(()=>fetchContacts());
}
function Contact() {
  const [contacts, setContacts] = useState([]);
  const [visible,setVisible]=useState(false);
  // to fetch all the contact details we use use-Effect.
  const fetchContacts=async()=>{
    await axios.get(`${baseUrl}/user/contacts`,{
    withCredentials:true
    }).then(res=>res.data)
    .then(data=>data.contactList)
    .then(contactList=>contactList.contacts)
    .then(contacts=>setContacts(contacts));
  }
  useEffect(()=>{
  fetchContacts();
  },[contacts]);
  // function for calutaing the net Expense by each 
  // contact to show on he contacts page
  const Total = (expenses) => {
    let val = 0;
    expenses.map((expense) =>
      expense.Credit_debit === 'credit' ? (val += expense.Amount) : (val -= expense.Amount)
    );
    return val;
  }
  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-4">
        <div className="grid grid-cols-12 gap-4">
        <h4 className="col-span-1">S.No</h4>
        <h4 className="col-span-4">Name</h4>
        <h4 className="col-span-3">Number</h4>
        <h4 className="col-span-2">Total Expense</h4>
        <h4 className="col-span-2">Remove</h4>
      </div>
        <div>
          {contacts.map((contact, index) => (
            <div key={contact._id} className="grid grid-cols-12 gap-4">
              <p className="col-span-1">{index+1}</p>
              <p className="col-span-4">{contact.name}</p>
              <p className="col-span-4">{contact.number}</p>
              <p className="col-span-2">{Total(contact.expenses)}</p>
              <img src={delete_img} onClick={()=>removeConatct(contact._id,fetchContacts)}alt="remove" className="col-span-1" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          {visible?<AddNewContact fetchContacts={fetchContacts} setVisible={setVisible}/>:
          <button onClick={()=>setVisible(!visible)} className="bg-white text-black px-4 py-2 rounded-md w-full">Add Contacts</button>}
        </div>
      </div>
    </div>
  )
}
export default Contact;
