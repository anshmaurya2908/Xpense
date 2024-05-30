const expenseRouter = require('express').Router();
const Expense= require('../models/Expense');
// function to handle date and time. Required to push into historyArray
async function addTimestamp() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // January is 0, so we add 1
    const year = currentDate.getFullYear();
    // Format the timestamp as desired
    const timestamp = `${hours}:${minutes}:${seconds} - ${date}/${month}/${year}`;
    return timestamp;
}
expenseRouter.post('/',async(req,res)=>{
    // get data from user
    const Amount = parseInt(req.body.Amount);
    const Balance = parseInt(req.body.Balance);
    const { Credit_Debit, Reason, Category } = req.body;
    // check all the fields are entered
    if (!(Amount !== undefined  && Reason && Category && Credit_Debit !== undefined)) {
        return res.status(400).json({ message: 'Enter all the fields' });
    }
    // Initialize the historyArray if it's empty
    // if (historyArray.length === 0) {
    //     const Time = await addTimestamp();
    //     historyArray.push({ amount: 0, balance: 0, reason: "NA", category: "NA", time: Time });
    // }
    // Increase balance if Credit and Decrease the balance if Debit
    const Time = await addTimestamp();
    const expense=new Expense({
        Amount,
        Credit_Debit,
        Reason,
        Category,
    })
    console.log("THIS IS THE EXPENSE FROM THE CONTROLLER");
    return res.status(200).json({ message: "expense created successfully", expense });
})
module.exports = expenseRouter;
