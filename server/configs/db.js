import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () =>
            console.log("✅ MongoDB connected successfully")
        );
        mongoose.connection.on('error', (err) =>
            console.log("❌ MongoDB connection error:", err)
        );

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
    } catch (error) {
        console.log("❌ Connection failed:", error.message);
    }
};

export default connectDB;
