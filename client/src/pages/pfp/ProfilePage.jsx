import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { SkillsSection } from "@/components/SkillsSection";
import { Button } from "@/components/ui/button";
import axios from "@/components/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
// import Sidebar from "@/components/SideNav";

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/auth/me");
                setUserData(response.data.data);
                console.log(response.data.data)
                setLoading(false);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="flex flex-row justify-evenly items-start col-span-10 gap-8">
            <div className="border-2 bg-white border-gray-200 rounded-xl shadow-lg">
                <SkillsSection skills={userData?.skills} />
            </div>
            <div className="flex flex-col gap-4 max-w-[350px]">
                <div className="border-2 bg-white border-gray-200 rounded-xl shadow-lg">
                    <ProfileCard user={userData} />
                </div>
                <Button variant="default" className="shadow-lg">
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="flex flex-row justify-evenly items-start col-span-10 gap-8">
            <Skeleton className="h-[300px] w-[400px]" />
            <div className="flex flex-col gap-4 max-w-[350px]">
                <Skeleton className="h-[200px] w-[350px]" />
                <Skeleton className="h-[40px] w-[350px]" />
            </div>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="text-red-500 text-center">
            <p>Error: {message}</p>
        </div>
    );
}

export default ProfilePage;
