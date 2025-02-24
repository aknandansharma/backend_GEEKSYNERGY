import mongoose from "mongoose";
import colos from "colors";

// mongodb connections
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`DataBase Connected!`.bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgRed.white)
    }
}

export default connectDB;