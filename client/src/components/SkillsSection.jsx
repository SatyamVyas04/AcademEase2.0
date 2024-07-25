import { Badge } from "@/components/ui/badge";

export function SkillsSection() {
    return (
        <div className="p-4 ">
            <h1 className="text-2xl font-bold mb-4">Skills</h1>
            <div className="flex flex-wrap gap-2">
                <Badge>C++</Badge>
                <Badge>JavaScript</Badge>
                <Badge>REACT</Badge>
                <Badge>MERN</Badge>
                <Badge>Nodejs</Badge>
                <Badge>AI/ML</Badge>
                <Badge>AI/ML</Badge>
                <Badge>AI/ML</Badge>
                <Badge>AI/ML</Badge>
                <Badge>AI/ML</Badge>
                <Badge>AI/ML</Badge>
                <Badge>AI/ML</Badge>
            </div>
        </div>
    );
}
