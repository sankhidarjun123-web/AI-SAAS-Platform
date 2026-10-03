import { Map } from "lucide-react";
import { Link } from "react-router-dom";
const SubscribeBtn = () => {

    return <Link to="/billing" className="flex gap-2 h-10 p-1.5 font-medium cursor-pointer text-black border-2 border-black dark:border-white dark:text-white border-solid rounded-sm">
        <Map />
        <span>
            See Plans
        </span>
    </Link>
}


export default SubscribeBtn;