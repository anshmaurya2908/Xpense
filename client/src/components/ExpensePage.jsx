import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import AddExpense from './AddExpense';
const baseUrl = 'http://localhost:8000';
function ExpensePage() {
    const [avatar, setAvatar] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("food");
    const [totalExpenses, setTotalExpenses] = useState(0);
    const navigate = useNavigate();
    const handleAvatarChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };
    const handleAmount = (e) => {
        const value = e.target.value;
        setAmount(value);
    };
    const handleDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
    };
    const handleCategory = (e) => {
        const value = e.target.value;
        setCategory(value);
    };
    const handleSubmitExpense = async () => {
        try {
            const res = await axios.post(`${baseUrl}/addexpense`, {
                Amount: amount,
                Description: description,
                Category: category,
            }, {
                withCredentials: true,
            });
            const expenseData = res.data;
            console.log("Expense data ", expenseData);
            // Fetch the updated list of expenses after adding a new one
            fetchExpenses();
        } catch (error) {
            console.log("Error : ", error);
        }
    };
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
                {/* Add Expense Component */}
                < AddExpense
                    avatar={avatar}
                    handleAvatarChange={handleAvatarChange}
                    amount={amount}
                    handleAmount={handleAmount}
                    description={description}
                    handleDescription={handleDescription}
                    category={category}
                    handleCategory={handleCategory}
                    handleSubmitExpense={handleSubmitExpense}
                    totalExpenses={totalExpenses}
                    expenses={expenses}
                />
            </div>
        </div>

    );
}

export default ExpensePage;
