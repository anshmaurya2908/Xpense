const mongoose=require('mongoose');
const historySchema=new mongoose.Schema({
    Amount: {
        type: Number,
        required: true,
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
})
module.exports=mongoose.model('History',historySchema);