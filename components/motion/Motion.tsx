"use client";

import { motion } from "framer-motion";
import { fadeUp, transition } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  show: boolean;
  delay?: number;
  className?: string;
};

export default function Motion({
  children,
  show,
  delay = 0,
  className = "",
}: Props) {
  return (
    <motion.div
      initial={false}
      animate={show ? fadeUp.animate : fadeUp.initial}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}