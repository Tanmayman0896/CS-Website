"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";

interface BoxRevealProps {
  children: React.ReactNode;
  boxColor?: string; // Defaults to premium gold "#F4A119"
  duration?: number; // Defaults to premium weighty 1.3s
  ease?: Transition["ease"]; // Reuses Framer Motion's native easing types
  className?: string;
  delay?: number; // Optional delay before this specific reveal starts
  align?: string; // Custom/responsive alignment class, e.g. "justify-center"
  paddingClass?: string; // Custom padding class for compact layouts
  widthClass?: string; // Custom width class (defaults to "w-full")
  marginClass?: string; // Custom margin class (defaults to "-my-1 sm:-my-2")
  standalone?: boolean; // Set to true to trigger its own viewport triggers when not staggered by a parent
}

export default function BoxReveal({
  children,
  boxColor = "#F4A119",
  duration = 1.3,
  ease = [0.22, 1, 0.36, 1],
  className = "",
  delay = 0,
  align = "justify-center",
  paddingClass = "px-4 py-3 sm:py-5",
  widthClass = "w-full",
  marginClass = "-my-1 sm:-my-2",
  standalone = false,
}: BoxRevealProps) {
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -15, // elegant cinematic shift following the sweep
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration,
        ease,
        ...(delay > 0 ? { delay } : {}),
      },
    },
  };

  const boxVariants: Variants = {
    hidden: {
      x: "0%", // gold box is static and present initially
    },
    visible: {
      x: "103%", // slides out cleanly to reveal text
      transition: {
        duration,
        ease,
        ...(delay > 0 ? { delay } : {}),
      },
    },
  };

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {},
      }}
      initial={standalone ? "hidden" : undefined}
      whileInView={standalone ? "visible" : undefined}
      viewport={standalone ? { once: true, margin: "-10% 0px" } : undefined}
      className={`relative flex ${align} items-center select-none ${widthClass} ${marginClass} ${className}`}
    >
      {/* Boxed Reveal Container bounds block to text dimensions with vertical padding */}
      <div className={`relative overflow-hidden ${paddingClass} flex items-center ${align}`}>
        {/* Animated text layer */}
        <motion.div
          variants={textVariants}
          className="relative z-10 transform-gpu flex items-center justify-center py-1"
          style={{
            willChange: "transform, opacity",
          }}
        >
          {children}
        </motion.div>

        {/* Solid reveal block */}
        <motion.div
          variants={boxVariants}
          className="absolute inset-0 z-20 pointer-events-none transform-gpu"
          style={{
            backgroundColor: boxColor,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </motion.div>
  );
}
