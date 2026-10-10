"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

// Ultra-smooth Apple-style easing curve
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const; 

export function FadeUp({ children, delay = 0, className, ...props }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// MaskReveal: A high-end editorial animation where text slides up from behind a hidden mask
export function MaskReveal({ children, delay = 0, className }: MotionProps) {
  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 1.4,
          delay,
          ease: PREMIUM_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeIn({ children, delay = 0, className, ...props }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.4,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className, delay = 0, ...props }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: MotionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 1.2,
            ease: PREMIUM_EASE,
          }
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleImageReveal({ children, className, delay = 0 }: MotionProps) {
  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1.6,
          delay,
          ease: PREMIUM_EASE,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
