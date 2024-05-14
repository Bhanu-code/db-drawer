const mongoose = require('mongoose');
const TOdoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Todo', TOdoSchema);