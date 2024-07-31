import ProfileCard from "@/components/ProfileCard";
import { SkillsSection } from "@/components/SkillsSection";
import Sidebar from "@/components/SideNav";

function ProfilePage() {
    return (
        <div className="flex flex-row justify-between border-2 border-gray-200 p-6">
            <div className="basis-1/4 border-2 border-gray-200 rounded-xl max-w-[250px]">
                <Sidebar />
            </div>
            <div className="basis-2/4 border-2 border-gray-200 rounded-xl">
                <SkillsSection />
            </div>
            <div className="basis-1/2 border-2 border-gray-200 rounded-xl max-w-[350px]">
                <ProfileCard />
            </div>
        </div>
    );
}

export default ProfilePage;