// import React from "react";

function ProfileCard() {
	return (
		<div className="flex flex-col justify-start items-start p-8 gap-3">
			<div className="flex flex-row justify-center items-center gap-2">
				<div>
					<img
						className="h-14 w-14 rounded-xl"
						src="https://images.unsplash.com/photo-1721048149858-139c52892fc9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="pfpic"
					/>
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="text-2xl font-bold">Nishita Panchal</h1>
					<p>MERN Stack Developer</p>
				</div>
			</div>
			{/* description */}
			<div>
				<p>
					I am a sophomore. Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Quisquam et ipsa enim dolores architecto
					commodi hic ea{" "}
				</p>
			</div>
			{/* socials */}
			<div className="flex flex-row justify-center items-center gap-7">
				<ion-icon
					style={{
						fontSize: "24px",
						backgroundColor: "hsl(var(--primary))",
						padding: "4px",
						color: "white",
						borderRadius: "4px",
					}}
					name="logo-linkedin"
				></ion-icon>
				<ion-icon
					style={{
						fontSize: "24px",
						backgroundColor: "hsl(var(--primary))",
						padding: "4px",
						color: "white",
						borderRadius: "4px",
					}}
					name="logo-github"
				></ion-icon>
				<ion-icon
					style={{
						fontSize: "24px",
						backgroundColor: "hsl(var(--primary))",
						padding: "4px",
						color: "white",
						borderRadius: "4px",
					}}
					name="logo-instagram"
				>
					{" "}
				</ion-icon>
				<ion-icon
					style={{
						fontSize: "24px",
						backgroundColor: "hsl(var(--primary))",
						padding: "4px",
						color: "white",
						borderRadius: "4px",
					}}
					name="mail-outline"
				></ion-icon>
				<ion-icon
					style={{
						fontSize: "24px",
						backgroundColor: "hsl(var(--primary))",
						padding: "4px",
						color: "white",
						borderRadius: "4px",
					}}
					name="ellipsis-horizontal-outline"
				></ion-icon>
			</div>
		</div>
	);
}

export default ProfileCard;
