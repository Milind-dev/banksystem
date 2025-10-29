// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/db.js";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import seedSuperAdmin from "./db/seeder.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// console.log("Port", PORT);

// app.use(express.json());

// connectDB();
// seedSuperAdmin();


// const allowedOrigins = [
//     "http://localhost:3000",
//     "http://127.0.0.1:3000",
//     "http://localhost:5173",
//     "https://yourdomain.com"
// ];

// app.use(
//     cors({
//         origin: (origin, cb) => (!origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error("Not allowed by CORS"))),
//         credentials: true
//     })
// );

// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//         cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
//     })
// );

// app.use("/api/auth", authRoutes);

// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import session from "express-session";
import fs from "fs";
import path from "path";

import MongoStore from "connect-mongo";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import seedSuperAdmin from "./db/seeder.js";
import { logout } from "./controller/authController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
console.log("Port", PORT);

app.use(express.json());


// Make sure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// const allowedOrigins = [
//     "http://localhost:3000",
//     "http://127.0.0.1:3000",
//     "http://localhost:5173",
//     "https://yourdomain.com"
// ];

// app.use(
//     cors({
//         origin: (origin, cb) =>
//             !origin || allowedOrigins.includes(origin)
//                 ? cb(null, true)
//                 : cb(new Error("Not allowed by CORS")),
//         credentials: true, // ✅ required for sending cookies

//     })
// );


app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"],
        credentials: true,
    })
);

app.use("/uploads", express.static("uploads")); // serve images



// app.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//         cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
//     })
// );


app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecretkey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI, // same DB as your models
            collectionName: "sessions",
            ttl: 60 * 30, // ⏰ 30 minutes = session auto-expire after 30 min (in seconds)
        }),
        cookie: {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
            maxAge: 1000 * 60 * 30, // 30 minutes (in milliseconds)
            // maxAge: 59 * 1000, // 59 seconds

        },
    })
);

app.use("/api/auth", authRoutes);




(async () => {
    await connectDB();
    await seedSuperAdmin();
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
})();


