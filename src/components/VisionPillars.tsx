"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// --- Types ---
type VisionNode = {
    year: string;
    title: string;
    description: string;
    image?: string;
};

type VisionPillar = {
    id: string;
    title: string;
    theme: "teal" | "purple" | "orange";
    nodes: VisionNode[];
};

// --- Data ---
const pillarsData: VisionPillar[] = [
    {
        id: "pillar-1",
        title: "Pillar 1: Environmental AI Restoration (2025–2030)",
        theme: "teal",
        nodes: [
            {
                year: "2025",
                title: "Meadowlands Digital Twin",
                description: "Real-time environmental simulation.",
            },
            {
                year: "2026",
                title: "Water-cleaning Robotics",
                description: "Autonomous purification units deployed.",
            },
            {
                year: "2028",
                title: "Innovation Pipeline",
                description: "Scaling research to field application.",
            },
            {
                year: "2030",
                title: "Smart Sediment Mapping",
                description: "AI-driven soil analysis stations.",
            },
        ],
    },
    {
        id: "pillar-2",
        title: "Pillar 2: Human & AI Emotional Compatibility (2030–2037)",
        theme: "purple",
        nodes: [
            {
                year: "2030",
                title: "Emotional-Awareness AI",
                description: "Models that understand human sentiment.",
            },
            {
                year: "2033",
                title: "Therapeutic AI Companions",
                description: "Support for mental health integration.",
            },
            {
                year: "2035",
                title: "Education Integration",
                description: "AI-assisted developmental learning.",
            },
            {
                year: "2037",
                title: "Human-AI Harmony Framework",
                description: "Standardized protocols for interaction.",
            },
        ],
    },
    {
        id: "pillar-3",
        title: "Pillar 3: AI Infrastructure for the Future (2035–2045)",
        theme: "orange",
        nodes: [
            {
                year: "2035",
                title: "Autonomous Construction",
                description: "Self-building eco-infrastructure.",
            },
            {
                year: "2038",
                title: "AI Sewer & Sanitation",
                description: "Smart waste management systems.",
            },
            {
                year: "2040",
                title: "Home AI Robots",
                description: "Domestic assistance and automation.",
            },
            {
                year: "2045",
                title: "Citywide Eco-AI Networks",
                description: "Fully integrated disaster response & balance.",
            },
        ],
    },
];

// --- Theme Configurations ---
// Maps theme keys to Tailwind utility classes or arbitrary values.
const themeConfig = {
    teal: {
        gradientText: "from-teal-400 to-blue-500",
        border: "border-teal-500/30",
        bg: "bg-teal-900/10",
        glow: "shadow-[0_0_15px_rgba(45,212,191,0.2)]",
        shadowColor: "rgba(45, 212, 191, 0.25)",
        line: "from-teal-400 to-blue-500",
        pill: "bg-teal-500/20 text-teal-300",
    },
    purple: {
        gradientText: "from-purple-400 to-fuchsia-500",
        border: "border-purple-500/30",
        bg: "bg-purple-900/10",
        glow: "shadow-[0_0_15px_rgba(192,132,252,0.2)]",
        shadowColor: "rgba(192, 132, 252, 0.25)",
        line: "from-purple-400 to-fuchsia-500",
        pill: "bg-purple-500/20 text-purple-300",
    },
    orange: {
        gradientText: "from-orange-400 to-amber-500",
        border: "border-orange-500/30",
        bg: "bg-orange-900/10",
        glow: "shadow-[0_0_15px_rgba(251,146,60,0.2)]",
        shadowColor: "rgba(251, 146, 60, 0.25)",
        line: "from-orange-400 to-amber-500",
        pill: "bg-orange-500/20 text-orange-300",
    },
};

export default function VisionPillars() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track overall scroll progress for the main vertical line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "end 80%"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="relative w-full min-h-screen bg-background text-ink py-20 px-4 md:px-8 overflow-hidden font-sans">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto relative" ref={containerRef}>
                <header className="text-center mb-24 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-6 tracking-tight"
                    >
                        The Pillars of Our Vision
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted max-w-2xl mx-auto text-lg"
                    >
                        A strategic roadmap to restoring balance between technology, nature,
                        and humanity through the coming decades.
                    </motion.p>
                </header>

                {/* Central Vertical Line Container */}
                <div className="absolute left-[20px] md:left-1/2 top-80 md:top-32 bottom-20 w-1 md:-ml-[0.5px] h-full z-0">
                    {/* Background track line */}
                    <div className="w-full h-full bg-border/50 rounded-full" />
                    {/* Animated fill line */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-teal-400 via-purple-500 to-orange-500 rounded-full"
                    />
                </div>

                <div className="relative z-10 space-y-32">
                    {pillarsData.map((pillar, index) => (
                        <PillarSection key={pillar.id} pillar={pillar} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PillarSection({
    pillar,
    index,
}: {
    pillar: VisionPillar;
    index: number;
}) {
    const theme = themeConfig[pillar.theme];

    return (
        <section className="relative">
            {/* Sticky Header for the Pillar */}
            <div className="sticky top-24 z-20 mb-12 flex items-center justify-start md:justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-100px" }}
                    className={`
            backdrop-blur-md bg-surface/80 border ${theme.border} 
            px-6 py-3 rounded-full shadow-2xl ${theme.glow}
            flex items-center gap-3
          `}
                >
                    <span
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.line}`}
                    />
                    <h3
                        className={`text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientText}`}
                    >
                        {pillar.title}
                    </h3>
                </motion.div>
            </div>

            <div className="space-y-12">
                {pillar.nodes.map((node, nodeIndex) => (
                    <TimelineNode
                        key={nodeIndex}
                        node={node}
                        theme={theme}
                        isEven={nodeIndex % 2 === 0}
                        pillarIndex={index}
                    />
                ))}
            </div>
        </section>
    );
}

function TimelineNode({
    node,
    theme,
    isEven,
    pillarIndex,
}: {
    node: VisionNode;
    theme: any;
    isEven: boolean;
    pillarIndex: number;
}) {
    // Mobile: all nodes align left (w/ line on left). Desktop: alternates (left/right).
    // Actually, for a single central line, desktop usually alternates left/right.
    // Mobile: line is on left (20px), nodes are to the right.

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`
        flex flex-col md:flex-row items-start md:items-center w-full
        ${isEven ? "md:flex-row-reverse" : ""}
      `}
        >
            {/* Desktop Spacer (50% width) */}
            <div className="hidden md:block w-1/2" />

            {/* Central Connector Node (Dot) */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 -ml-2 md:-ml-2 mt-6 md:mt-0 flex items-center justify-center z-20">
                <div className="w-4 h-4 bg-background rounded-full border border-muted/50 flex items-center justify-center">
                    <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-br ${theme.line}`}
                    />
                </div>
            </div>

            {/* Content Card */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                <motion.div
                    whileInView={{
                        scale: 1.05,
                        boxShadow: `0 0 30px ${theme.shadowColor}`,
                        backgroundColor: "var(--nv-surface-active, rgba(15, 23, 42, 0.6))", // subtle bg shift
                        borderColor: "rgba(255,255,255,0.15)"
                    }}
                    viewport={{ margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`
            relative group p-6 mx-4 md:mx-12 rounded-2xl
            bg-surface/40 border border-border hover:border-border/80
            backdrop-blur-sm transition-all duration-300
            hover:shadow-2xl hover:-translate-y-1
            ${isEven ? "md:text-right" : "md:text-left"}
          `}
                >
                    {/* Hover Glow Effect */}
                    <div
                        className={`
              absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
              transition-opacity duration-300 pointer-events-none
              bg-gradient-to-br ${theme.bg}
            `}
                    />

                    <div className="relative z-10">
                        <div
                            className={`
                inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                ${theme.pill}
                ${isEven ? "md:ml-auto" : "md:mr-auto"}
              `}
                        >
                            {node.year}
                        </div>

                        <h4 className="text-xl font-bold text-ink mb-2">{node.title}</h4>
                        <p className="text-muted text-sm leading-relaxed">
                            {node.description}
                        </p>

                        {/* Placeholder Image Area */}
                        <div className="mt-4 w-full h-32 rounded-lg bg-surface/50 overflow-hidden relative border border-border/50 group-hover:border-border transition-colors">
                            <img
                                src="https://placehold.co/600x400/0f172a/64748b?text=Visual+Placeholder"
                                alt="Visualization"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
