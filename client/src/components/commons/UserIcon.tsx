import { User2Icon } from "lucide-react";
import { useAccount } from "../../context/AuthContext";

const UserIcon = () => {
    const { isAuthenticated, accountData } = useAccount();

    return (
        <button
            className={`rounded-full h-10 transition-all duration-200 cursor-pointer
                ${
                    isAuthenticated
                        ? "px-2 flex items-center gap-2"
                        : "w-10 flex items-center justify-center"
                }`}
        >
            {isAuthenticated && accountData ? (
                <>
                    <img
                        src={accountData.profile}
                        alt={accountData.name ?? accountData.email}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                </>
            ) : (
                <User2Icon size={20} />
            )}
        </button>
    );
};

export default UserIcon;