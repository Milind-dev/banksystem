import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Breadcrumb from "../utils/Breadcrumb.jsx"; // make sure path is correct

export default function Layouts() {
    const location = useLocation();

    // Define routes where breadcrumb should be hidden
    const hideBreadcrumbRoutes = ["/", "/verify-otp"];
    const shouldShowBreadcrumb = !hideBreadcrumbRoutes.includes(location.pathname);

    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#FAFCFE" }}>
            {/* Sidebar (fixed on the left) */}
            <Sidebar />

            {/* Main Content Area */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header (sticky at top) */}
                <Header />

                {/* Breadcrumb (just below header, auto-hide on some routes) */}
                {shouldShowBreadcrumb && (
                    <Box sx={{ position: "sticky", top: 80, zIndex: 5, bgcolor: "#F9FAFB" }}>
                        <Breadcrumb />
                    </Box>
                )}
                {/* Outlet: page content goes here */}
                <Box sx={{ flex: 1, overflowY: "auto", p: 2, mt: shouldShowBreadcrumb ? 0 : "95px" }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
