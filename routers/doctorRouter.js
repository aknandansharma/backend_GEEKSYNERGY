import express from "express"
import { DoctorUser, PatientUser, getallPatinet } from "../controllers/patientController.js";

const router = express.Router();

// All Routers 
router.post("/doctor", DoctorUser);
router.post("/patient", PatientUser);
router.get("/doctors/:doctorId/patients", getallPatinet)



export default router;