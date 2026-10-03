import { NavLink } from "react-router-dom";
import type { NavOption } from "./AsideDashboard";

interface MobileNavProps {
    navItems: NavOption[];
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems, setMobileMenuOpen }) => {
    return (
        <nav className="md:hidden w-full p-4">
            <ul className="flex flex-col gap-2">
                {navItems.map((item: NavOption) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.navPath}>
                            <NavLink
                                onClick={() => setMobileMenuOpen(false)}
                                to={item.navPath}
                                className={({ isActive }) => `
                                    group flex items-center rounded-xl
                                    transition-all duration-200
                                    gap-3 px-4 py-3

                                    ${
                                        isActive
                                            ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                                    }
                                `}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileNav;