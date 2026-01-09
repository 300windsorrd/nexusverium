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
        y: 40,
        title: "Bio-Filtration Matrix",
        description: "Native root systems sequester nitrates and phosphates.",
        color: "cyan",
    },
    {
        id: "boat",
        x: 60,
        y: 65,
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

export function IntegratedMissionSystem() {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    // Helper to handle touch/click toggling on mobile
    const handleInteraction = (id: string) => {
        setActiveHotspot(activeHotspot === id ? null : id);
    };

    return (
        <section className="relative w-full overflow-hidden bg-slate-900">
            {/* Container for the image and overlays */}
            <div className="relative aspect-[16/9] w-full max-h-screen">
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
                                    <div className="absolute left-1/2 top-full mt-2 w-max max-w-[200px] -translate-x-1/2 sm:max-w-xs md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-6 md:translate-x-0">

                                        {/* Visual Connector Line (Hidden on mobile, visible on MD+) */}
                                        <motion.div
                                            className="hidden md:block absolute right-full top-1/2 h-[1px] w-6 bg-cyan-400/50 origin-right"
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={{ scaleX: 1, opacity: 1 }}
                                            exit={{ scaleX: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />

                                        {/* Glassmorphism Card */}
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
            </div>
        </section>
    );
}
