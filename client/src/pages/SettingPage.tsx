import { UserProfile } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { getUserProfileAppearance } from "../data/styles";

export default function SettingsPage() {
    const mode = useSelector(
        (state: RootState) => state.theme.mode
    );

    return (
        <div className="min-h-screen w-full bg-[#EEE9DF] p-4 pt-24 text-slate-900 dark:bg-slate-950 dark:text-slate-50 md:p-8 md:pt-28">
            <div className="mx-auto w-full max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Settings
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage your profile and account preferences.
                    </p>
                </div>

                <UserProfile
                    appearance={getUserProfileAppearance(mode)}
                />
            </div>
        </div>
    );
}
