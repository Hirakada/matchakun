"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import TypingAnimation from "@/components/ui/Typing";
import MenuSelector from "@/components/ui/MenuSelector";
import { LayoutGroup } from "framer-motion";

import { MatchaItem } from "@/data/matchaMenu";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "framer-motion";

import { Info, X } from "lucide-react";

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

    const [baseOffset, setBaseOffset] = useState(0);
    const [scaleRange, setScaleRange] = useState<[number, number]>([1.42, 1.58]);
    const [deviceKey, setDeviceKey] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const GLOBAL_SCALE_RANGE: [number, number] = [0.32, 1];

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const isTablet =
            width >= 768 && width <= 1024 && isTouch && height > 500;

            const isMobileDevice =
            width < 768 || (isTouch && height < 500);

            if (!isMobileDevice && !isTablet) {
                setBaseOffset(800);
                setScaleRange(GLOBAL_SCALE_RANGE);
                setIsMobile(false);
            } else if (isTablet) {
                setBaseOffset(640);
                setScaleRange(GLOBAL_SCALE_RANGE);
                setIsMobile(true);
            } else {
                setBaseOffset(360);
                setScaleRange(GLOBAL_SCALE_RANGE);
                setIsMobile(true);
            }

            setDeviceKey((prev) => prev + 1);
        };

        update();
        window.addEventListener("resize", update);

        return () => window.removeEventListener("resize", update);
    }, []);

    const yParallax = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [80, 0, -120]
    );
    const yFront = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const yFrontFinal = useTransform(
        [yFront],
        (v) => {
            const value = (v as number[])[0];
            return isMobile ? value * 0.15 : value;
        }
    );

    const yBg = useTransform(scrollYProgress, [0, 1], [15, -15]);

    const y = useTransform(
        [yParallax],
        (v) => {
            const value = (v as number[])[0];

            return isMobile
            ? baseOffset + value * 0.2
            : value + baseOffset;
        }
    );

    const baseScale = useTransform(
        [scrollYProgress],
        (v) => {
            const p = (v as number[])[0];

            if (isMobile) {
            return (
                scaleRange[0] +
                (scaleRange[1] - scaleRange[0]) * p * 0.5 +
                0.25
            );
            }

            return scaleRange[0] + (scaleRange[1] - scaleRange[0]) * p;
        }
    );

    const smoothY = useSpring(y, {
        stiffness: 70,
        damping: 22,
    });

    const finalScale = useTransform(baseScale, (s) =>
        isHover ? s + 0.04 : s
    );

    const smoothScale = useSpring(finalScale, {
        stiffness: 70,
        damping: 22,
    });

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prev) => !prev);
    };

    {/* Slide */}
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const index = menu.findIndex((m) => m.id === active.id);
        if (index !== -1) setCurrentIndex(index);
    }, [active, menu]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % menu.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [menu.length]);

    useEffect(() => {
        if (!menu[currentIndex]) return;
        setActive(menu[currentIndex]);
    }, [currentIndex, menu, setActive]);

    return (
    <section
        id="hero"
        className="relative h-[100dvh] flex bg-brand-300 overflow-hidden"
    >
        {/* BACKGROUND */}
        <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
        >
        <div className="absolute w-125 h-125 bg-white/20 blur-[120px] rounded-full -top-25 -left-[100px]" />
        <div className="absolute w-100 h-100 bg-lime-200/30 blur-[120px] rounded-full -bottom-25 -right-25" />
        </motion.div>

        {/* IMAGE */}
        <div
            ref={ref}
            className="absolute inset-0 w-full overflow-visible z-10 pointer-events-none"
        >            
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="
                    absolute bottom-[-5%] left-1/2 -translate-x-1/2
                    w-[160%] max-w-300
                    pointer-events-auto
                    "
                >
                <motion.div
                    style={{ 
                        y: smoothY, 
                        scale: smoothScale
                    }}
                >
                    <Image
                        src={active.image}
                        alt={active.name}
                        width={608}
                        height={1080}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* CONTENT GRID */}
        <LayoutGroup id="menu-selector">

        <div className="max-w-300 mx-auto px-6 pt-20 flex flex-col lg:px-12 lg:grid lg:grid-cols-3 items-center w-full z-20">

            {/* LEFT */}
            <motion.div
                style={{ y: yFrontFinal }}
                className="flex flex-col text-center lg:text-left space-y-8 lg:space-y-16"
            >
                <div>
                    <h1 className="font-heading text-display text-neutral-black tracking-tight">
                        Matcha
                    </h1>

                    <h2 className="flex justify-center lg:justify-start font-heading text-h2 lg:text-h3 text-neutral-black">
                        <span className="text-neutral-white">For</span>
                        <span className="ml-2">
                            <TypingAnimation
                                strings={[
                                    "Everyday Energy",
                                    "Lively Focus",
                                    "Modern Living",
                                ]}
                                loop
                            />
                        </span>
                    </h2>
                </div>

                <Button className="mx-auto lg:mx-0 w-fit font-semibold px-6 py-3 rounded-full bg-neutral-black text-white hover:scale-105 hover:shadow-lg transition-all duration-300">
                    Find Us
                </Button>

                <MenuSelector
                    menu={menu}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    className="flex lg:hidden justify-center mt-6 flex-wrap"
                />
            </motion.div>

            {/* EMPTY CENTER */}
            <div />

            {/* RIGHT */}
            <motion.div
                style={{ y: yFrontFinal }}
                className="flex flex-col items-end gap-2 max-w-xs w-full ml-auto absolute bottom-[6dvh] lg:relative"
            >   
                <button
                    onClick={toggle}
                    className="
                        lg:hidden
                        w-fit
                        p-3 rounded-full 
                        bg-neutral-black 
                        backdrop-blur-md border 
                        border-neutral-white/20
                        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                        text-neutral-white
                        hover:scale-105 transition"
                    >
                    <span className="
                        pointer-events-none absolute inset-0 rounded-full
                        bg-gradient-to-b from-neutral-white/30 to-transparent
                        opacity-40
                    " />

                    <span className="relative z-10">
                        {open ? <X size={18} /> : <Info size={18} />}
                    </span>
                </button>
                <motion.div
                    style={{
                        visibility: (!isMobile || open) ? "visible" : "hidden",
                        pointerEvents: (!isMobile || open) ? "auto" : "none"
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
                        <MenuSelector
                            menu={menu}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            className="hidden lg:flex relative flex-wrap gap-2 w-full justify-start"
                        />

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
        </LayoutGroup>
    </section>
    );
}