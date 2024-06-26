const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const userRouter = require('./routes/userRoute');
const  logger  = require('./logger');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

