"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Props = {
  children: (isVisible: boolean) => React.ReactNode;
  className?: string;
};

export default function RevealOnScroll({
  children,
  className = "",
}: Props) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "0px 0px -6.5% 0px",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isInView);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children(visible)}
    </motion.div>
  );
}