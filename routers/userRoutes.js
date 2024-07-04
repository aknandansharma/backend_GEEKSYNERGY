import express from "express"
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";

import authUser from "../middlewares/AuthMiddleware.js"
const router = express.Router();

// All Routers 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/alluser", authUser, getAllUsers);
router.put("/updateuser/:id", authUser,  updateUser);
router.delete("/deleteuser/:id", authUser , deleteUser);




export default router;