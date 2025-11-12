require("dotenv").config();
require("bcrypt");
const express = require("express");
const cors = require("cors");
const app = express();
const router = require('./routers/auth-router');
const connectDb = require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");
const contactRouter = require('./routers/contact-router');
// const paymentRouter = require('./routers/payment-router');
const staffScheduleRoutes = require('./routers/staffSchedule');
const appointmentRoutes = require('./routers/appointment-router');
const userRoutes = require('./routers/userRoutes');

const PORT = 5001;

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

// Route middlewares
app.use('/api/auth', router);
app.use('/api/form', contactRouter);
// app.use('/api/payments', paymentRouter);
app.use('/api/staff-schedule', staffScheduleRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on the port : ${PORT}`);
    });
});