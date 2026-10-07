import { useRef } from "react";
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
import { LayoutDashboard, SunMoon, LogOut, Menu, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";




const NavBar = ({ isMobile, setMobileMenuOpen, setOpenHistory }: { isMobile: boolean; setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>, setOpenHistory: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const { isAuthenticated, accountData } = useAccount();
    const grandParentRef = useRef<HTMLDivElement>(null);
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
            optionName: "settings",
            onClick: () => navigate("/settings"),
            optionIcon: Settings,
            disabled: false,
            danger: false
        },
        {
            optionName: "sign out",
            onClick: () => signOut(),
            optionIcon: LogOut,
            disabled: false,
            danger: true
        },
    ]

    return (
        <nav ref={grandParentRef} className="fixed bg-[#EEE9DF] dark:bg-slate-950 z-50 top-0 left-0 w-full h-16 px-10 flex items-center gap-10">

            <Link
                to="/"
                className="flex items-center gap-2 group"
            >
                <div className="flex items-center">
                    {/* Mobile */}
                    <img
                        src={mode !== "dark" ? AppIcon : AppIconDark}
                        className="block md:hidden h-10 w-10 transition-transform duration-200 group-hover:scale-105"
                        alt="app-icon"
                    />

                    {/* Desktop */}
                    <img
                        src={mode !== "dark" ? AppIconBig : AppIconBigDark}
                        className="hidden md:block h-20 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
                        alt="Real Mentor AI"
                    />
                </div>

                {accountData.plan === "committed" && (
                    <span
                        className="
                inline-flex items-center gap-1.5
                rounded-full
                border border-amber-300/50
                bg-gradient-to-r from-amber-400/15 to-orange-400/15
                px-2.5 py-1
                text-xs font-semibold
                text-amber-600
                dark:border-amber-400/30
                dark:from-amber-400/10
                dark:to-orange-400/10
                dark:text-amber-300
                shadow-sm
                backdrop-blur-sm
                transition-all duration-200
                group-hover:shadow-md
            "
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]" />
                        Committed
                    </span>
                )}
            </Link>


            <div className="absolute right-4 flex gap-5">
                <SubscribeBtn />
                {!isAuthenticated && <div onClick={() => navigate("/login", {
                    state: { backgroundLocation: location }
                })}><LoginBtn /></div>}

                <DropDown options={options} grandParentRef={grandParentRef}>
                    <UserIcon />
                </DropDown>

                {(isMobile && location.pathname.includes("dashboard")) && <button onClick={() => setMobileMenuOpen((prev) => !prev)} className="md:hidden">
                    <Menu size={20} />
                </button>}

                {(isMobile && location.pathname.includes("career-mentor")) && <button onClick={() => setOpenHistory((prev) => !prev)} className="md:hidden">
                    <Menu size={20} />
                </button>}
            </div>
        </nav>
    )
}

export default NavBar;