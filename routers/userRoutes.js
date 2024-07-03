import express from "express"
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// All Routers 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/alluser", getAllUsers);
router.put("/updateuser", updateUser);
router.delete("/deleteuser/:id", deleteUser);




export default router;