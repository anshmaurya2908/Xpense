const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
    Amount: {
        type: Number,
        required: true,
    },
    Balance:{
        type: Number,
        Default:0
    },
    Credit_Debit:{
        type: String,
        required: true,
    },
    Reason: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;