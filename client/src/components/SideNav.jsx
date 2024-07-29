import { useState } from "react";
import { Link } from "react-router-dom";
import {
	ChatIcon,
	HomeIcon,
	CalendarIcon,
	UserGroupIcon,
} from "@heroicons/react/outline";

const navigation = [
	{ name: "Home", to: "/", icon: HomeIcon },
	{ name: "Chat", to: "/friends", icon: ChatIcon },
	{ name: "Connect", to: "/groups", icon: UserGroupIcon },
	{ name: "Schedule", to: "/schedule", icon: CalendarIcon },
];

const preferences = [
	{ name: "ComputerScience", to: "#" },
	{ name: "OperatingSystems", to: "#" },
	{ name: "Data Structures", to: "#" },
	{ name: "Database Management", to: "#" },
	{ name: "Engineering Calculus", to: "#" },
	{ name: "FrontEnd Development", to: "#" },
	{ name: "Python", to: "#" },
	{ name: "Machine Learning", to: "#" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
	const [currentSection, setCurrentSection] = useState(navigation[0].name);

	return (
		<div className="hidden lg:block lg:col-span-3 xl:col-span-2">
			<nav
				aria-label="Sidebar"
				className="sticky top-4 divide-y divide-gray-300"
			>
				<div className="pb-8 space-y-1">
					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.to}
							className={classNames(
								currentSection === item.name
									? "bg-gray-200 text-gray-900"
									: "text-gray-600 hover:bg-gray-50",
								"group flex items-center px-3 py-2 text-sm font-medium rounded-md"
							)}
							onClick={() => setCurrentSection(item.name)}
						>
							<item.icon
								className={classNames(
									currentSection === item.name
										? "text-gray-500"
										: "text-gray-400 group-hover:text-gray-500",
									"flex-shrink-0 -ml-1 mr-3 h-6 w-6"
								)}
								aria-hidden="true"
							/>
							<span className="truncate">{item.name}</span>
						</Link>
					))}
				</div>
				<div className="pt-10">
					<p
						className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
						id="preferences-headline"
					>
						My preferences
					</p>
					<div
						className="mt-3 space-y-2"
						aria-labelledby="preferences-headline"
					>
						{preferences.map((community) => (
							<Link
								key={community.name}
								to={community.to}
								className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
							>
								<span className="truncate">
									{community.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}
