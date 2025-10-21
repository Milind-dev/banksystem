import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";

export default function Layouts() {
    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#FAFCFE" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Header />

                <Box sx={{ flex: 1, overflowY: "auto", p: 2, mt: "25px" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
