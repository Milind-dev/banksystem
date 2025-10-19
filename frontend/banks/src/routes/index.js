import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUI from "../components/LoginUI";
import RegisterAdmin from "../components/RegisterAdmin";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginUI />} />
                <Route path="/" element={<RegisterAdmin />} />


                {/* Public routes */}
                {/* <Route path="/otp-screen" element={<OtpScreen />} /> */}

                {/* <Route element={<Layouts />}>
                    <Route path="/home-dashboard" element={<Home />} />
                    <Route path="/Organization" element={<Organization />} />
                    <Route path="/organization/details/:id" element={<Orgdetails />} />

                    <Route
                        path="/organization-details"
                        element={<OrganizationDetails />}
                    />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/auditors" element={<Auditors />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
