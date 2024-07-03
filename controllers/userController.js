import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// register user section
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, profession } = req.body;

        if (!name) {
            return res.send({ message: "Name is Required." });
        }
        if (!email) {
            return res.send({ message: "Email is Required." });
        }
        if (!password) {
            return res.send({ message: "Password is Required." });
        }
        if (!phone) {
            return res.send({ message: "Phone is Required." });
        }
        if (!profession) {
            return res.send({ message: "Profession is Required." });
        }

        // check already user 
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10); // hash the password.
        user = new User({ name, email, password: hashPassword, phone, profession });
        await user.save();
    
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in registration user..",
        });
    }
}


// login user.
export const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(404).send({
                message: "Invalid email or password",
            });
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });

        res.status(200).send({
            message: "login successfully",
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Please Check Email and Password before login.",
        });
    }
}

// get All users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Get All user. ",
        });
    }
  };


// get All users
export const updateUser = async (req, res) => {
    try {
        const { id, name, phone, profession } = req.body;
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.phone = phone;
        user.profession = profession;
        await user.save();
    
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Update User. ",
        });
    }
  };

  //  delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
        await user.remove();
        res.json({ message: 'User removed' });
      } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Delete User. ",
        });
      }
  };



