import { UserProfile } from "@clerk/clerk-react";

export default function SettingsPage() {
    return (
        <UserProfile
            appearance={{
                elements: {
                    rootBox: "w-full h-screen",
                    cardBox: "w-screen h-screen rounded-none border-0 shadow-none",
                },
            }}
        >
        </UserProfile>
    );
}