const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const enrollmentRoutes = require("./src/routes/enrollmentRoutes");
const assignmentRoutes = require("./src/routes/assignmentRoutes");
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.use("/api/enroll", enrollmentRoutes);
app.use("/api/assign", assignmentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
