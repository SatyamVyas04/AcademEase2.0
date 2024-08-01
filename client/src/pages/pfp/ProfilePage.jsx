import ProfileCard from "@/components/ProfileCard";
import { SkillsSection } from "@/components/SkillsSection";
import { Button } from "@/components/ui/button";
// import Sidebar from "@/components/SideNav";

function ProfilePage() {
	return (
		<div className="flex flex-row justify-evenly items-start col-span-10 gap-8">
			<div className="border-2 bg-white border-gray-200 rounded-xl shadow-lg">
				<SkillsSection />
			</div>
			<div className="flex flex-col gap-4 max-w-[350px]">
				<div className="border-2 bg-white border-gray-200 rounded-xl shadow-lg">
					<ProfileCard />
				</div>
				<Button variant="default" className="shadow-lg">Edit Profile</Button>
			</div>
		</div>
	);
}

export default ProfilePage;
