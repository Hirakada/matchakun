import { motion } from "framer-motion";
import { MatchaItem } from "@/data/matchaMenu";

type Props = {
    menu: MatchaItem[];
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
            <motion.div
                layout="position"
                className={className}
            >
            {menu.map((item, index) => {
                const isActive = currentIndex === index;

                return (
                    <motion.button
                        layout
                        key={item.id}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className="relative px-3 py-1.5 text-xs font-medium rounded-full border border-white/20 whitespace-nowrap">
                        <span className="absolute inset-0">
                            {isActive && (
                                <motion.span
                                    layoutId="selector-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        backgroundColor: "#fefefe",
                                        willChange: "transform",
                                        backfaceVisibility: "hidden"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 35,
                                    }}
                                />
                            )}
                        </span>

                        <span className={`relative z-10 ${isActive ? "text-black" : "text-neutral-white"}`}>
                            {item.name}
                        </span>
                    </motion.button>
                );
            })}
        </motion.div>
    );
}