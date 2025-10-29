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
