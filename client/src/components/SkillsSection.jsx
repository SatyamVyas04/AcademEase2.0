import { Badge } from "@/components/ui/badge";

export function SkillsSection({ skills }) {
    return (
        <div className="p-8 ">
            <h1 className="text-2xl font-bold mb-4">Skills</h1>
            <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <Badge key={index}>{skill}</Badge>
                    ))
                ) : (
                    <p>No skills added yet.</p>
                )}
            </div>
        </div>
    );
}
