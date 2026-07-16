import { useState } from "react";
import { footerData } from "../../data/footer";

const Footer = () => {

    const [expandSection, setExpandSection] = useState<Record<string, boolean>>({});

    return <div className="mb-20 flex flex-col gap-4">
        <div className="w-full min-h-[500px] p-5 bg-amber-300/90 dark:bg-amber-800/90">
            <div className="w-full p-5 border-b-2 flex items-center dark:border-white border-b-black border-b-solid">
                <h3 className="text-4xl font-extrabold">Real Mentor AI</h3>
            </div>

            <div className="w-full flex p-5 flex-col gap-10 sm:flex-row justify-evenly">
                {
                    Object.entries(footerData).map(([section, links]) => {
                        const isExpanded = expandSection[section];
                        return <div key={section}>
                            <h3 className="font-semibold">{section}</h3>

                            <ul className="mt-10 flex flex-col gap-3">
                                {Object.entries(links).slice(0, isExpanded ? undefined : 4).map(([label, href]) => {

                                    return <li className="font-light text-black/75 dark:text-white/75 dark:hover:text-white hover:text-black transition-all ease-in text-sm" key={label}>
                                        <a href={href}>{label}</a>
                                    </li>
                                })}
                            </ul>

                            {isExpanded ? <button className="mt-3 cursor-pointer text-sm font-medium" onClick={() => setExpandSection(prev => ({
                                ...prev,
                                [section]: false
                            }))}>
                                less ▲
                            </button> : <button className="mt-3 cursor-pointer text-sm font-medium" onClick={() => setExpandSection(prev => ({
                                ...prev,
                                [section]: true
                            }))}>
                                more ▼
                            </button>}
                        </div>
                    })
                }
            </div>
        </div>

        <div className="w-full px-5 text-sm font-light">
            © {new Date().getFullYear()} Real Mentor AI. All rights reserved.
        </div>
    </div>
}

export default Footer;