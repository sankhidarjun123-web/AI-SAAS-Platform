import { Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SubscribeBtn = () => {

    const navigate = useNavigate();

    return <button onClick={() => navigate("/billing")} className="flex gap-2 h-10 p-1.5 font-medium cursor-pointer light-btn text-black border-2 border-black dark:border-white dark:text-white border-solid rounded-sm">
        <Map />
        <span>
            See Plans
        </span>
    </button>
}


export default SubscribeBtn;