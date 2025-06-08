import dotenv from 'dotenv';
dotenv.config();



import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoute.js';
import blogRouter from './routes/blogRoute.js';

const app = express();

await connectDB();

app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,

    })
})

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
