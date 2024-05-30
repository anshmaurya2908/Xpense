const mongoose=require('mongoose');
const Expense=require('./Expense');
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:String,
        required:true,
    },
    expenses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense'
        }],
        default: []
    }
    // we could add expense Schema in referene 
    // for a separate page of each conatct of user;
})
module.exports=mongoose.model('Contact',contactSchema);