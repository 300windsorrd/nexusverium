"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { withBasePath } from "@/lib/paths";

interface HotspotConfig {
    id: string;
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
    title: string;
    description: string;
    color?: string;
}

const hotspots: HotspotConfig[] = [
    {
        id: "wetland",
        x: 20,
        y: 70,
        title: "Bio-Filtration Matrix",
        description: "Native root systems sequester nitrates and phosphates.",
        color: "cyan",
    },
    {
        id: "boat",
        x: 60,
        y: 85,
        title: "Autonomous Debris Collector",
        description: "AI-driven pathfinding with 50kg capacity.",
        color: "cyan",
    },
    {
        id: "drone",
        x: 70,
        y: 10,
        title: "Lidar & Thermal Analysis",
        description: "Real-time pollution density mapping.",
        color: "cyan",
    },
];

export function IntegratedMissionSystem({ children }: { children?: React.ReactNode }) {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    // Helper to handle touch/click toggling on mobile
    const handleInteraction = (id: string) => {
        setActiveHotspot(activeHotspot === id ? null : id);
    };

    return (
        <section className="nv-reveal relative left-1/2 right-1/2 min-h-screen w-screen -ml-[50vw] -mr-[50vw] overflow-hidden rounded-none border border-[var(--nv-border)] bg-slate-900 flex flex-col shadow-[var(--shadow-card)]">
            {/* Container for the image and overlays */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={withBasePath("/images/Interactive Hero.png")}
                    alt="Integrated Mission System showing Drone, Boat, and Wetland"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                {/* Overlay Gradient for consistency if needed, optional */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Hotspots Layer */}
                <div className="absolute inset-0 z-10">
                    {hotspots.map((hotspot) => (
                        <div
                            key={hotspot.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                            onMouseEnter={() => setActiveHotspot(hotspot.id)}
                            onMouseLeave={() => setActiveHotspot(null)}
                            onClick={() => handleInteraction(hotspot.id)}
                        >
                            {/* Pulsing Beacon */}
                            <div className="relative group cursor-pointer p-4">
                                {/* Ping animation ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-cyan-400 opacity-75"
                                    initial={{ scale: 0.5, opacity: 0.8 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut",
                                    }}
                                />

                                {/* Core Dot */}
                                <div className="relative h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] border border-white transition-transform duration-300 group-hover:scale-125" />
                            </div>

                            {/* Connecting Line and Card */}
                            <AnimatePresence>
                                {activeHotspot === hotspot.id && (
                                    <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-6 w-max max-w-xs">

                                        {/* Visual Connector Line */}
                                        <motion.div
                                            className="absolute right-full top-1/2 h-[1px] w-6 bg-cyan-400/50 origin-right"
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={{ scaleX: 1, opacity: 1 }}
                                            exit={{ scaleX: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />

                                        {/* Glassmorphism Card (Desktop) */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col gap-1 rounded-xl bg-slate-900/60 p-4 text-left shadow-xl backdrop-blur-md border border-white/10"
                                        >
                                            <h3 className="text-sm font-bold text-cyan-50 uppercase tracking-wider">
                                                {hotspot.title}
                                            </h3>
                                            <p className="text-xs text-slate-200 leading-relaxed">
                                                {hotspot.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Mobile Card (Bottom Sheet Style) */}
                <AnimatePresence>
                    {activeHotspot && (() => {
                        const activeData = hotspots.find(h => h.id === activeHotspot);
                        if (!activeData) return null;
                        return (
                            <motion.div
                                key="mobile-card"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="md:hidden absolute bottom-4 left-4 right-4 z-40 rounded-xl bg-slate-900/80 p-4 shadow-2xl backdrop-blur-md border border-white/10"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-cyan-50 uppercase tracking-wider mb-1">
                                            {activeData.title}
                                        </h3>
                                        <p className="text-xs text-slate-200 leading-relaxed">
                                            {activeData.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveHotspot(null);
                                        }}
                                        className="ml-2 -mt-1 text-cyan-400 p-1"
                                        aria-label="Close"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>

            {/* Content Overlay (passed as children, e.g. Hero Copy) */}
            {children && (
                <div className="relative z-30 flex min-h-screen w-full flex-col justify-start px-6 pt-20 pb-10 sm:pt-24 sm:pb-14 md:items-start md:justify-start md:px-10 pointer-events-none">
                    <div className="pointer-events-auto">
                        {children}
                    </div>
                </div>
            )}
        </section>
    );
}
