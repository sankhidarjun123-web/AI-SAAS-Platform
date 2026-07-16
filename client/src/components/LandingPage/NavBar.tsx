import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import { AppIcon, AppIconDark } from "../../assets/images";
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
    const [isHoveredIcon, setIsHoveredIcon] = useState<boolean>(false);
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
        <nav className="fixed bg-[#EEE9DF] dark:bg-slate-950 z-50 top-0 left-0 w-full h-20 flex items-center px-5 gap-10">

            <Link onMouseEnter={() => setIsHoveredIcon(true)}
                onMouseLeave={() => setIsHoveredIcon(false)} to="/">
                <div
                    className="flex h-10 items-center gap-3">
                    <h3
                        className="hidden md:inline ease-in-out font-extrabold text-2xl transition-all duration-300"
                        style={{
                            textShadow: isHoveredIcon
                                ? "0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 20px #ffcc00, 0 0 40px #ffb300"
                                : "none",
                        }}
                    >
                        Real Mentor AI
                    </h3>
                    <img src={mode !== "dark" ? AppIcon : AppIconDark} className={`${isHoveredIcon && "shadow-[0_0_5px_#ffd700,0_0_10px_#ffd700,0_0_20px_#ffcc00,0_0_40px_#ffb300]"} h-10 transition-all duration-300 ease-in-out aspect-square`} alt="app-icon" />
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