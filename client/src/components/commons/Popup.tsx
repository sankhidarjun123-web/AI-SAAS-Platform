import { useEffect } from "react";
// type setting for the popup props
type PopupProps = {
    children: React.ReactNode,
    onClose: () => void;
}

// Popup that appears on top of any element(reusable component)
const Popup = ({ children, onClose }: PopupProps) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";


        return () => {
            document.body.style.overflow = "auto";
        };


    }, []);


    return <div className="fixed top-0 left-0 z-[999] w-screen h-screen flex justify-center items-center backdrop-blur-md" onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
};


export default Popup;