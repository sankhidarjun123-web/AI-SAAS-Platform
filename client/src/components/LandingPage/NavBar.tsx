import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import { AppIcon, AppIconDark, AppIconBig, AppIconBigDark } from "../../assets/images";
import LoginBtn from "../commons/LoginBtn";
import SubscribeBtn from "../commons/SubscribeBtn";
import UserIcon from "../commons/UserIcon";
import { useAccount } from "../../context/AuthContext";
import { useClerk } from "@clerk/clerk-react";
import DropDown, { type Options } from "../commons/DropDown";
import { LayoutDashboard, SunMoon, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";




const NavBar = () => {

    const { isAuthenticated } = useAccount();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useClerk();

    const dipatch = useDispatch();

    const options: Options[] = [
        {
            optionName: "go to dashboard",
            onClick: () => navigate("/dashboard"),
            optionIcon: LayoutDashboard,
            disabled: false,
            danger: false
        },
        {
            optionName: "toggle theme",
            onClick: () => dipatch(toggleTheme()),
            optionIcon: SunMoon,
            disabled: false,
            danger: false
        },
        {
            optionName: "sign out",
            onClick: () => signOut(),
            optionIcon: LogOut,
            disabled: false,
            danger: false
        },
    ]

    return (
        <nav className="fixed bg-[#EEE9DF] dark:bg-slate-950 z-50 top-0 left-0 w-full h-16 flex items-center px-5 gap-10">

            <Link to="/">
                <div className="flex items-center">
                    {/* Mobile */}
                    <img
                        src={mode !== "dark" ? AppIcon : AppIconDark}
                        className="block md:hidden h-10 w-10"
                        alt="app-icon"
                    />

                    {/* Desktop */}
                    <img
                        src={mode !== "dark" ? AppIconBig : AppIconBigDark}
                        className="hidden md:block h-24 w-auto"
                        alt="Real Mentor AI"
                    />
                </div>
            </Link>


            <div className="absolute right-4 flex gap-5">
                <SubscribeBtn />
                {!isAuthenticated && <div onClick={() => navigate("/login", {
                    state: { backgroundLocation: location }
                })}><LoginBtn /></div>}

                <DropDown options={options}>
                    <UserIcon />
                </DropDown>
            </div>
        </nav>
    )
}

export default NavBar;