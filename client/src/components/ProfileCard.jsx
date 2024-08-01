// import React from "react";

function SocialIcon({ name, link }) {
    return (
        <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
        >
            <ion-icon
                style={{
                    fontSize: "24px",
                    backgroundColor: "hsl(var(--primary))",
                    padding: "4px",
                    color: "white",
                    borderRadius: "4px",
                }}
                name={name}
            ></ion-icon>
        </a>
    );
}

function ProfileCard({ user }) {
    const {
        avatar,
        username,
        email,
        academicInterests,
        college,
        goals,
        cgpa,
        passoutYear,
        phoneNo,
        program,
        description,
        Social_linkedIn,
        Social_instagram,
    } = user || {};
    return (
        <div className="flex flex-col justify-start items-start p-6 gap-3">
            <div className="flex flex-row justify-center items-center gap-3">
                <div>
                    <img
                        className=" w-[70px] rounded-xl"
                        src={avatar}
                        alt="pfpic"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-xl font-bold">{username}</h1>
                    <p className="text-sm">{college}</p>
                </div>
            </div>
            {/* description */}
            <div>{description}</div>
            {/* socials */}
            <div className="flex flex-row justify-center items-center gap-7">
                <SocialIcon name="logo-linkedin" link={Social_linkedIn} />
                <SocialIcon name="logo-instagram" link={Social_instagram} />
                <SocialIcon name="mail-outline" link={`mailto:${email}`} />
                <SocialIcon name="ellipsis-horizontal-outline" link="#" />
            </div>
        </div>
    );
}

export default ProfileCard;
