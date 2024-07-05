import mongoose from "mongoose";

//Create a API of Doctor n Patient records on mongodb and store it in Json.
const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true
    },
},{ timestamps: true })

export default mongoose.model('Doctor', doctorSchema);

