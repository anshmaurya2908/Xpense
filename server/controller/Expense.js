const expenseRouter = require('express').Router();
const Expense= require('../models/Expense');
const Contact=require('../models/Contact');
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
    const amount = parseInt(req.body.amount);
    const { description, category,contactId } = req.body;
    // check all the fields are entered
    if (!(amount !== undefined  && category )) {
        return res.status(400).json({ message: 'Enter all the fields' });
    }
    const expense=new Expense({
        amount,
        description,
        category
    });
    // adding new Expense to the contact in which 
    // it has been added;
    const savedExpense=await expense.save();
    const contact=await Contact.findById(contactId);
    contact.expenses=await contact.expenses.concat(savedExpense._id);
    await contact.save();
    console.log("THIS IS THE EXPENSE FROM THE CONTROLLER");
    return res.status(200).json({ message: "expense created successfully", savedExpense });
})
module.exports = expenseRouter;
