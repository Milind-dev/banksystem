// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import SuperAdminmodel from "../models/SuperAdmin.js";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;

// const seedSuperAdmin = async () => {
//     try {
//         await mongoose.connect(MONGO_URI);
//         console.log("MongoDB connected");

//         const existing = await SuperAdminmodel.findOne({ username: "superadmin" });
//         if (existing) {
//             console.log("SuperAdmin already exists");
//             process.exit();
//         }

//         const hashedPassword = await bcrypt.hash("superadmin123", 10);
//         const superadmin = new SuperAdminmodel({
//             username: "superadmin",
//             name: "Super Admin",
//             password: hashedPassword,
//             role: "superadmin",
//             isVerified: true
//         });

//         await superadmin.save();
//         console.log("✅ SuperAdmin created");
//         process.exit();
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// };
// export default seedSuperAdmin



// db/seeder.js
import bcrypt from "bcrypt";
import SuperAdminmodel from "../models/SuperAdmin.js";

const seedSuperAdmin = async () => {
    try {
        const existing = await SuperAdminmodel.findOne({ username: "superadmin" });
        if (existing) {
            console.log("🔸 SuperAdmin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("superadmin123", 10);
        const superadmin = new SuperAdminmodel({
            username: "superadmin",
            name: "Super Admin",
            password: hashedPassword,
            role: "superadmin",
            isVerified: true
        });

        await superadmin.save();
        console.log("✅ SuperAdmin seeded successfully");
    } catch (err) {
        console.error("❌ SuperAdmin seeding failed:", err.message);
    }
};

export default seedSuperAdmin;
