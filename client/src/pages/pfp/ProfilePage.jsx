import ProfileCard from "@/components/ProfileCard";
import ProfileLeftNavbar from "@/components/ProfileLeftNavbar";
import { SkillsSection } from "@/components/SkillsSection";

function ProfilePage() {
    return (
        <div className="flex flex-row justify-between items-center border-2 border-gray-200 p-6">
            <div className="basis-1/4 border-2 border-gray-200 rounded-xl max-w-[250px]">
                <ProfileLeftNavbar />
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