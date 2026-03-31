import { motion } from "framer-motion";
import { MatchaBase } from "@/data/matchaMenu";

type Props = {
    menu: MatchaBase[];
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    className?: string;
};

export default function MenuSelector({
    menu,
    currentIndex,
    setCurrentIndex,
    className = "",
}: Props) {
    return (
        <div className={className}>
            {menu.map((item, index) => {
                const isActive = currentIndex === index;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className="relative px-3 py-1.5 text-xs font-medium rounded-full border border-white/20 whitespace-nowrap transition duration-200"
                    >
                        {isActive && (
                            <motion.span
                                layoutId="selector-pill"
                                className="absolute inset-0 bg-neutral-white rounded-full shadow-md"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                            />
                        )}

                        <span className={`relative z-10 ${isActive ? "text-black" : "text-neutral-white"}`}>
                            {item.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}