const express = require('express');
const connectDB = require('./db/db.js');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes.js');
const cors = require('cors');
const session = require('express-session');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
connectDB();


// List of allowed origins
const allowedOrigins = [
    'http://localhost:3000',       // React dev
    'http://127.0.0.1:3000',       // Alternate localhost
    'http://localhost:5173',       // Vite dev
    'https://yourdomain.com'       // Production frontend
];

// Configure CORS to use the list above
app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) cb(null, true);
        else cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // restrict HTTP methods
    credentials: true,
    optionsSuccessStatus: 200
}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));


// Middleware to parse JSON
app.use(express.json());

console.log("process env", process.env.PORT);

app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
