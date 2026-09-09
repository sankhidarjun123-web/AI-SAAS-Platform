import { UserProfile } from "@clerk/clerk-react";
import { Settings, Brain } from "lucide-react";

function AISettings() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">AI Preferences</h2>

            <div className="mt-6">
                <label>Mentor Style</label>

                <select>
                    <option>Supportive</option>
                    <option>Strict</option>
                    <option>Professional</option>
                </select>
            </div>
        </div>
    );
}

function LearningSettings() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Learning Preferences</h2>

            <div className="mt-6">
                <label>Experience Level</label>

                <select>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>
        </div>
    );
}

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
            <UserProfile.Page
                label="AI Preferences"
                url="ai-preferences"
                labelIcon={<Brain size={16} />}
            >
                <AISettings />
            </UserProfile.Page>

            <UserProfile.Page
                label="Learning"
                url="learning"
                labelIcon={<Settings size={16} />}
            >
                <LearningSettings />
            </UserProfile.Page>
        </UserProfile>
    );
}