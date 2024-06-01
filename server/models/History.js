const mongoose=require('mongoose');
const historySchema=new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
})
module.exports=mongoose.model('History',historySchema);