const mongoose = require('mongoose')


const TaskSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default :"pending"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users' //link to another collection
    }
})
module.exports=mongoose.model('Task',TaskSchema)