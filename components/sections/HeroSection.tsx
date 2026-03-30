"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import TypingAnimation from "@/components/ui/Typing";

import { MatchaItem } from "@/data/matchaMenu";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { useSpring } from "framer-motion";

type Props = {
    active: MatchaItem;
    setActive: (item: MatchaItem) => void;
    menu: MatchaItem[];
};

export default function HeroSection({
    active,
    setActive,
    menu,
}: Props) {
    const ref = useRef(null);
    const [isHover, setIsHover] = useState(false);

    const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    });

    const baseOffset = 360;

    const yParallax = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [80, 0, -120]
    );

    const yFront = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const y = useTransform(yParallax, (v) => v + baseOffset);
    const yBg = useTransform(scrollYProgress, [0, 1], [15, -15]);

    const smoothY = useSpring(y, {
        stiffness: 70,
        damping: 22,
    });

    const baseScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1.42, 1.58]
    );

    const finalScale = useTransform(baseScale, (s) =>
        isHover ? s + 0.04 : s
    );

    const smoothScale = useSpring(finalScale, {
        stiffness: 70,
        damping: 22,
    });

    return (
    <section
        id="hero"
        className="relative h-screen flex items-center bg-brand-300 overflow-hidden"
    >
        {/* BACKGROUND */}
        <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
        >
        <div className="absolute w-125 h-125 bg-white/20 blur-[120px] rounded-full -top-25 -left-[100px]" />
        <div className="absolute w-100 h-100 bg-lime-200/30 blur-[120px] rounded-full -bottom-25 -right-25" />
        </motion.div>

        <div ref={ref}
        className="absolute inset-0 flex justify-center pointer-events-none z-10"
        >
        <AnimatePresence mode="wait">
            <motion.div
            key={active.id}
            style={{ y: smoothY, scale: smoothScale }}
            initial={{ opacity: 0, scale: 1.3, y: baseOffset + 20 }}
            animate={{ opacity: 1, scale: 1.46, y: baseOffset }}
            exit={{ opacity: 0, scale: 1.5, y: baseOffset - 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto"
            >
            <Image
                src={active.image}
                alt={active.name}
                width={608}
                height={1080}
                className="will-change-transform max-w-[700px] w-full"
                priority
            />
            </motion.div>
        </AnimatePresence>
        </div>

        {/* CONTENT GRID */}
        <div className="max-w-300 mx-auto px-6 pt-20 flex flex-col lg:px-12 lg:grid lg:grid-cols-3 items-center w-full z-20">

            {/* LEFT */}
            <motion.div
                style={{ y: yFront }}
                className="flex flex-col text-center lg:text-left space-y-12"
            >
                <div>
                <h1 className="font-heading text-display text-neutral-black tracking-tight">
                    Matcha
                </h1>

                <h3 className="flex gap-2 justify-center lg:justify-start font-heading text-h3 text-neutral-black">
                    <span className="text-neutral-white">For</span>
                    <TypingAnimation
                    strings={[
                        "Everyday Energy",
                        "Lively Focus",
                        "Modern Living",
                    ]}
                    loop
                    />
                </h3>
                </div>

                <Button className="mx-auto lg:mx-0 w-fit font-semibold px-6 py-3 rounded-full bg-neutral-black text-white hover:scale-105 hover:shadow-lg transition-all duration-300">
                Find Us
                </Button>
            </motion.div>

            {/* EMPTY CENTER */}
            <div />

            {/* RIGHT */}
            <motion.div
                style={{ y: yFront }}
                className="max-w-xs w-full ml-auto"
            >
                <motion.div
                layout
                transition={{
                    layout: {
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    },
                }}
                className="
                    relative flex flex-col space-y-5
                    p-5 rounded-2xl
                    backdrop-blur-xl
                    bg-neutral-black
                    border border-neutral-white/20
                    shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                    text-neutral-white
                    overflow-hidden
                "
                >
                <div className="
                    pointer-events-none absolute inset-0 rounded-2xl
                    bg-gradient-to-b from-neutral-white/30 to-transparent
                    opacity-40
                " />

                <motion.div layout className="relative flex flex-wrap gap-2 w-full justify-start">
                    {menu.map((item) => {
                    const isActive = active.id === item.id;

                    return (
                        <button
                        key={item.id}
                        onClick={() => setActive(item)}
                        className="hidden lg:block relative px-3 py-1.5 text-xs font-medium rounded-full border border-white/20 transition duration-200 hover:scale-95"
                        >
                        {isActive && (
                            <motion.span
                            layoutId="selector-pill"
                            className="absolute inset-0 bg-white rounded-full shadow-md"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                            />
                        )}

                        <span className={`relative z-10 ${isActive ? "text-black" : "text-white/80"}`}>
                            {item.name}
                        </span>
                        </button>
                    );
                    })}
                </motion.div>

                {/* DESCRIPTION */}
                <div className="relative">
                    <AnimatePresence mode="popLayout">
                    <motion.p
                        key={active.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-body-sm text-left leading-relaxed text-white/80"
                    >
                        {active.description}
                    </motion.p>
                    </AnimatePresence>
                </div>

                {/* INGREDIENTS */}
                <div className="relative">
                    <AnimatePresence mode="popLayout">
                    <motion.div
                        key={active.id}
                        layout
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        variants={{
                        hidden: {},
                        show: {
                            transition: {
                            staggerChildren: 0.08,
                            },
                        },
                        }}
                        className="flex flex-wrap gap-3 justify-start w-full"
                    >
                        {active.ingredients.map((ing) => (
                        <motion.div
                            key={ing}
                            variants={{
                            hidden: { opacity: 0, y: 10 },
                            show: { opacity: 1, y: 0 },
                            }}
                            className="flex items-center gap-2 text-body-sm text-white/80"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                            <span>{ing}</span>
                        </motion.div>
                        ))}
                    </motion.div>
                    </AnimatePresence>
                </div>

                </motion.div>
            </motion.div>
        </div>
    </section>
    );
}