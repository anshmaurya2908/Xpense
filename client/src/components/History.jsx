import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dateSvg from '../assets/date.svg';
import messageSvg from '../assets/message.svg';
import { useNavigate } from 'react-router-dom';
const baseUrl = 'http://localhost:8000';
function History() {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const navigate = useNavigate;
    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${baseUrl}/user/expenses`, {
                withCredentials: true,
            });
            const userData = res.data;
            console.log("User Data for testing...", userData);
            setExpenses(userData.expenses);
            setTotalExpenses(userData.expenses.reduce((acc, expense) => acc + expense.Amount, 0));
        } catch (error) {
            console.log("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [navigate]);

    return (
        <div className="flex flex-col sm:flex-row h-[92.4vh] overflow-y-auto bg-gradient-to-r from-gray-300 via-[#c595d1] to-[#d4c6d9]">
            <div className="border sm:border-gray-50 sm:rounded-none w-full sm:w-2/3 lg:w-3/4 p-4 lg:mx-7 lg:my-7 shadow-md m-2 bg-white bg-opacity-60 sm:bg-opacity-80 flex flex-col items-center lg:rounded-2xl md:rounded-2xl transition duration-200">

                <div className="w-full lg:w-[60%] mt-4 space-y-4 mb-4 p-4 flex justify-center border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                    <div className="text-2xl font-bold text-purple-800">
                        Total Expense : <span className="text-red-500 text-2xl">&#8377;{totalExpenses}</span>
                    </div>
                </div>

                <div className="w-full lg:w-[60%] mt-4 space-y-4 overflow-y-auto overflow-hidden hide-scrollbar">
                    {expenses.reverse().map((expense, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div className="flex justify-between w-full">
                                    <span className="text-lg font-semibold uppercase text-purple-800">{expense.Category}</span>
                                    <span className={`text-lg font-semibold ${expense.Amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>&#8377; {Math.abs(expense.Amount)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                                <div className="flex items-center">
                                    <img src={dateSvg} alt="Date" className="w-6 h-6 fill-current mr-2" />
                                    <span className="ml-2">{new Date(expense.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                    <img src={messageSvg} alt="Message" className="w-6 h-6 fill-current mr-2" />
                                    <span className="ml-2 capitalize">{expense.Description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {<style jsx>{`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .hide-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }`}
                </style>}

            </div>
        </div>
    );
}

export default History