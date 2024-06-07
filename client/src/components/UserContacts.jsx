import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import contactSvg from '../assets/contacts.svg';
import dashboardSvg from '../assets/dashboard.svg';
import historySvg from '../assets/history.svg';
import moneySvg from '../assets/money.svg';
function UserContacts() {
     const [avatar, setAvatar] = useState(null);
     const handleAvatarChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <div className="w-[30%] lg:w-[30%] lg:mx-7 lg:my-7 p-4 bg-white bg-opacity-60 sm:bg-opacity-80 flex flex-col justify-center items-center shadow-md m-2 lg:rounded-2xl md:rounded-2xl transition duration-200">
            <div className="w-full border sm:border-gray-50 sm:rounded-none sm:w-[30%] lg:w-[30%] lg:mx-7 lg:my-7 p-4 bg-white bg-opacity-60 sm:bg-opacity-80 flex flex-col justify-center items-center shadow-md m-2 lg:rounded-2xl md:rounded-2xl transition duration-200">
                <div className="flex flex-col items-center mb-4">
                    <div className="mb-2">
                        <input type="file" onChange={handleAvatarChange} className="hidden" id="avatar" />
                        <label htmlFor="avatar" className="cursor-pointer">
                            <img
                                src={avatar || 'https://cdn.pixabay.com/photo/2023/02/01/09/25/cristiano-ronaldo-7760045_960_720.png'}
                                alt="Avatar"
                                className="rounded-full w-24 h-24 border-4 border-white hover:border-gray-400 transition duration-200"
                            />
                        </label>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700 sm:text-xl">Username</h2>
                </div>
                </div>
            <div className="flex-grow w-[100%]">
                <ul className="flex flex-col items-center gap-2">
                    <li className="mb-2 flex items-center justify-center w-full">
                        <Link to={"/dashboard/expensepage"} className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl" style={{ width: "90%" }}>
                            <img src={moneySvg} alt="Add Expense" className="w-8 h-8 fill-current mr-2" />
                            Add Expense
                        </Link>
                    </li>
                    <li className="mb-2 flex items-center justify-center w-full">
                        <Link to={"/dashboard/contactdetails"} className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl" style={{ width: "90%" }}>
                            <img src={contactSvg} alt="Contacts" className="w-8 h-8 fill-current mr-2" />
                            Contacts
                        </Link>
                    </li>
                    <li className="mb-2 flex items-center justify-center w-full">
                        <Link to="/dashboard/analytics" className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl" style={{ width: "90%" }}>
                            <img src={dashboardSvg} alt="Dashboard" className="w-8 h-8 fill-current mr-2" />
                            Analytics
                        </Link>
                    </li>
                    <li className="mb-2 flex items-center justify-center w-full">
                        <Link to="/dashboard/history" className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl" style={{ width: "90%" }}>
                            <img src={historySvg} alt="History" className="w-8 h-8 fill-current mr-2" />
                            History
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default UserContacts;
