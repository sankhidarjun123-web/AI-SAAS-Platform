import { useState, useLayoutEffect, useRef, type ReactNode, useEffect } from "react"
import { type LucideIcon } from "lucide-react";

export type Options = {
    optionName: string,
    optionIcon?: LucideIcon | null,
    onClick: () => void,
    disabled: boolean,
    danger: boolean
};

interface DropDownProps {

    children: ReactNode,
    options: Options[]
}

const DropDown = ({ children, options }: DropDownProps) => {

    const [childHeight, setChildHeight] = useState<number>(0);
    const [childWidth, setChildWidth] = useState<number>(0);
    const [opened, setOpened] = useState<boolean>(false);

    const childRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (childRef.current) {
            setChildHeight(childRef.current.offsetHeight);
            setChildWidth(childRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {

        const handleClickOutside = (e: MouseEvent) => {

            if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
                setOpened(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
    }, [])

    return <div ref={parentRef} className="relative">
        <div ref={childRef} onClick={() => setOpened(!opened)}>
            {children}
        </div>
        {opened && <ul className={`absolute bg-[#EEE9DF] dark:bg-slate-950 flex flex-col gap-2 p-2 rounded-sm min-h-10 shadow-sm`} style={{ top: childHeight + 8, right: 2, minWidth: `${childWidth + 5}px` }}>
            {options.map((option, i) => {
                const Icon = option.optionIcon;

                return <li
                    key={i}
                    onClick={() => {
                        if (option.disabled) return;

                        option.onClick();
                        setOpened(false);
                    }}
                    className={`flex items-center gap-2 px-2 py-2 rounded
                    ${option.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800"}
                    ${option.danger ? "text-red-500" : ""}
                    `}
                >
                    {Icon && <Icon size={16} />}
                    <span>{option.optionName}</span>
                </li>
            })}
        </ul>}
    </div>
}


export default DropDown;