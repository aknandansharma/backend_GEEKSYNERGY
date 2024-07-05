import Patient from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";
import JWT from "jsonwebtoken"

export const PatientUser = async (req, res) => {
    try {
        const { name, age, disease } = req.body;
 
        const user = new Patient({ name, age, disease });
        await user.save();
    
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        res.status(201).json({
            message: "Patient registered successfully",
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in registration user..",
        });
    }
}

export const DoctorUser = async (req, res) => {
    try {
        const { name, role, email } = req.body;
 
        const user = new Doctor({ name, role, email });
        await user.save();
    
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        res.status(201).json({
            message: "Doctor registered successfully",
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in registration user..",
        });
    }
}


export const getallPatinet = async (req, res) => {
    try {
        const patients = await Patient.find({ doctorId: req.params._id });
        res.send(patients);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Get All user. ",
        });
    }
  };
