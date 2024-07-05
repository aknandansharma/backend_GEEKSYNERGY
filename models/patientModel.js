import mongoose from "mongoose";


// this is patient model.
const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true,
    },
    disease:{
        type: String,
        require: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
},{ timestamps: true })

export default mongoose.model('Patient', patientSchema);