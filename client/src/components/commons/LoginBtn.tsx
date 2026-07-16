import { LogIn } from "lucide-react";

const LoginBtn = () => {
    return (
        <button
            className="
                flex
                gap-2
                items-center
                h-10
                p-1.5
                cursor-pointer
                rounded-sm
                text-sm
                font-medium

                common-btn
            "
        >
            <LogIn />
            <span>
                Login
            </span>
        </button>
    );
};

export default LoginBtn;