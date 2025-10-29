import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { UploadProfilePic } from "../api/auth/ApiServices";
import { useEffect } from "react";
import { setadminprofile, setprofile } from "../store/slice/authSlice";
import { jwtDecode } from "jwt-decode";


export default function Profile() {
    const dispatch = useAppDispatch();
    const [previewPic, setPreviewPic] = useState(null);

    const profilepic = useAppSelector((state) => state.auth?.profile?.data?.profilePic);
    const token = useAppSelector(state => state.auth?.sessions?.data?.token);
    const usernameroleuserid = useAppSelector(state => state.auth?.decodeadmintoken)
    const isverified = useAppSelector(state => state.auth?.sessions?.data?.isVerified)
    console.log("usernameroleuserid", usernameroleuserid)
    // const auth = useAppSelector(state => state.auth)
    // console.log(auth)


    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token data:", decoded);
                dispatch(setadminprofile(decoded))
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [token]);



    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create a temporary preview
        const previewURL = URL.createObjectURL(file);
        setPreviewPic(previewURL);

        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            const response = await fetch("http://localhost:8000/api/auth/upload-profile-pic", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: formData,
            });

            const data = await response.json();
            console.log("Upload response:", data);
            dispatch(setprofile(data))
            // ✅ Update preview to show the new backend URL (optional)
            if (data?.profilePic) {
                setPreviewPic(`http://localhost:8000${data.profilePic}`);
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                <div className="relative">
                    <img
                        // src={profilepic || "/default-profile.png"}
                        src={profilepic ? `http://localhost:8000${profilepic}` : "/default-profile.png"}

                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                        onClick={() => document.getElementById("profileUpload").click()}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="profileUpload"
                        onChange={handleProfilePicChange}
                        className="absolute bottom-0 right-0 opacity-0 w-20 h-20 cursor-pointer"
                    />


                </div>
                <div>
                    <h2 className="text-lg font-semibold text-black">{usernameroleuserid.username}</h2>
                    <p className="text-sm text-gray-600">{usernameroleuserid.role}</p>
                    <p className="text-sm text-gray-600">{usernameroleuserid.userId}</p>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-black font-medium text-sm">Personal Information</h3>
                    <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
                        Edit ✏️
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-black">
                    <div>
                        <p className="text-gray-500 text-xs">First Name</p>
                        <p>{usernameroleuserid.username}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Last Name</p>
                        <p>{usernameroleuserid.role}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">User Id</p>
                        <p>{usernameroleuserid.userId}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Email Address</p>
                        <p>info@binary-fusion.com</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Phone Number</p>
                        <p>(+91) 75666 </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">is verified</p>
                        <p>{isverified}</p>
                    </div>
                </div>
            </div>

            {/* Address */}
            {/* <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-black font-medium text-sm">Address</h3>
                    <button className="border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded flex items-center gap-1">
                        Edit ✏️
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-black">
                    <div>
                        <p className="text-gray-500 text-xs">Country</p>
                        <p>India</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">City</p    >
                        <p>Gwalior</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs">Postal Code</p>
                        <p>474011</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
