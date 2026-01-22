"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// --- Shared Components ---

const Section = ({
    children,
    className = "",
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) => {
    return (
        <section
            id={id}
            className={`relative min-h-screen flex flex-col justify-center items-center px-6 py-24 overflow-hidden ${className}`}
        >
            {children}
        </section>
    );
};

const FadeIn = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[var(--nv-primary-strong)] font-semibold">
        {children}
    </span>
);

// --- Slide 1: Clarity (Value Prop) ---
const Slide1_Clarity = () => {
    return (
        <Section className="text-center">
            <FadeIn>
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--nv-bg-glow-1)_0%,transparent_60%)] opacity-40 blur-3xl" />
                <h2 className="text-[var(--nv-muted)] text-sm md:text-base uppercase tracking-[0.2em] mb-6">
                    Environmental Restoration
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 bg-gradient-to-br from-[var(--nv-surface)] via-[var(--nv-ink)] to-[var(--nv-primary-strong)] bg-clip-text text-transparent drop-shadow-sm">
                    Nexus Verium
                </h1>
                <p className="text-xl md:text-3xl text-[var(--nv-muted)] max-w-3xl mx-auto leading-relaxed">
                    By combining <Highlight>Floating Wetlands</Highlight> with <Highlight>Advanced AI</Highlight>, we are restoring the <Highlight>Hackensack & Meadowlands</Highlight> waterways to their natural pre-Industrial state.
                </p>
                <div className="mt-8 text-sm text-[var(--nv-muted)] italic opacity-80">
                    Inspired by the Harbor Wetlands Project in Maryland.
                </div>
                <div className="mt-12 flex justify-center gap-4 text-sm font-medium text-[var(--nv-muted)]">
                    <span className="px-4 py-2 rounded-full bg-[var(--nv-surface)] border border-[var(--nv-border)]">
                        Purify
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[var(--nv-surface)] border border-[var(--nv-border)]">
                        Restore
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[var(--nv-surface)] border border-[var(--nv-border)]">
                        Monitor
                    </span>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 2: Problem (Pain) ---
const Slide2_Problem = () => {
    return (
        <Section className="bg-black/20">
            <FadeIn className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-500/90">
                        The "Metalands" Legacy
                    </h2>
                    <p className="text-lg text-[var(--nv-muted)] mb-6">
                        The Industrial Revolution left New Jersey with the most polluted rivers in the country. Factory runoff turned the beautiful freshwater ways of Hackensack into <span className="text-[var(--nv-ink)]">toxic waste zones</span>.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Pollution spikes from industrial boom",
                            "Massive factory waste runoff",
                            "Loss of natural ecosystems",
                            "Most polluted waters in the US",
                        ].map((item, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-3 text-[var(--nv-ink)] opacity-80"
                            >
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden glass-surface p-8 flex flex-col justify-center items-center border border-red-900/30 bg-red-950/5">
                    <div className="text-6xl font-bold text-red-500/20 absolute top-4 right-6">
                        !
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-[var(--nv-ink)] mb-2">
                            Critical
                        </h3>
                        <p className="text-sm text-[var(--nv-muted)]">
                            Urgent need for restoration
                        </p>
                        <p className="text-xs text-[var(--nv-muted)] mt-2 opacity-60">
                            Hackensack / Meadowlands
                        </p>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 3: Solution (Simple & Sharp) ---
const Slide3_Solution = () => {
    return (
        <Section>
            <FadeIn className="text-center w-full max-w-4xl mx-auto">
                <h2 className="text-[var(--nv-primary)] text-sm uppercase tracking-widest mb-6">
                    The Solution
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold mb-12">
                    Floating Wetlands + AI
                </h3>

                <p className="text-xl text-[var(--nv-muted)] max-w-3xl mx-auto mb-12">
                    We are creating floating wetlands to <b>purify water</b> and <b>bring back the natural ecosystem</b>, powered by AI for comprehensive management.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "AI Monitoring",
                            desc: "Continuous, autonomous water quality tracking.",
                        },
                        {
                            title: "AI Cleaning",
                            desc: "Active purification and debris management.",
                        },
                        {
                            title: "AI Reporting",
                            desc: "Automated data analysis and compliance reporting.",
                        },
                        {
                            title: "AI Research",
                            desc: "Actively researching new ways to restore water.",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="glass-surface p-6 rounded-2xl border border-[var(--nv-border)] hover:border-[var(--nv-primary)] transition-colors duration-300"
                        >
                            <div className="w-10 h-10 rounded-full bg-[var(--nv-bg-glow-2)] flex items-center justify-center text-[var(--nv-primary-strong)] font-bold text-lg mb-4 mx-auto">
                                {i + 1}
                            </div>
                            <h4 className="text-lg font-bold mb-2">{card.title}</h4>
                            <p className="text-[var(--nv-muted)] text-sm">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 4: Wedge (Go-to-market start) ---
const Slide4_Wedge = () => {
    return (
        <Section>
            <FadeIn className="w-full max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">
                    Our Wedge Strategy
                </h2>
                <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
                    <div className="flex-1 p-8 rounded-2xl bg-[var(--nv-surface)] border border-[var(--nv-border)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--nv-primary-strong)]" />
                        <h3 className="text-2xl font-bold mb-2">Step 1: Meadowlands</h3>
                        <p className="text-[var(--nv-muted)] mb-4 font-mono text-xs uppercase tracking-wider">
                            Proof of Concept
                        </p>
                        <p className="text-sm opacity-80">
                            Deploy initial floating wetlands in the Hackensack River to demonstrate rapid water purification.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center text-[var(--nv-muted)]">
                        →
                    </div>
                    <div className="flex-1 p-8 rounded-2xl bg-[var(--nv-surface)]/50 border border-[var(--nv-border)]/50 group hover:bg-[var(--nv-surface)] transition-all">
                        <h3 className="text-2xl font-bold mb-2 opacity-60 group-hover:opacity-100">
                            Step 2: Industrial
                        </h3>
                        <p className="text-[var(--nv-muted)] mb-4 font-mono text-xs uppercase tracking-wider">
                            Expansion
                        </p>
                        <p className="text-sm opacity-60 group-hover:opacity-100">
                            Target heavily polluted industrial zones and urban waterways nationwide.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center text-[var(--nv-muted)]">
                        →
                    </div>
                    <div className="flex-1 p-8 rounded-2xl bg-[var(--nv-surface)]/50 border border-[var(--nv-border)]/50 group hover:bg-[var(--nv-surface)] transition-all">
                        <h3 className="text-2xl font-bold mb-2 opacity-60 group-hover:opacity-100">
                            Step 3: Global
                        </h3>
                        <p className="text-[var(--nv-muted)] mb-4 font-mono text-xs uppercase tracking-wider">
                            Standard
                        </p>
                        <p className="text-sm opacity-60 group-hover:opacity-100">
                            Establish Nexus Verium wetlands as the global standard for ecosystem restoration.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 5: Differentiation (Moat) ---
const Slide5_Differentiation = () => {
    return (
        <Section className="bg-[var(--nv-surface)]/10">
            <FadeIn className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-16">Why We Win</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 text-left border-l-2 border-[var(--nv-primary)] pl-6">
                        <h3 className="text-xl font-bold mb-2">Nature + Technology</h3>
                        <p className="text-[var(--nv-muted)]">
                            The only solution combining biological wetland restoration with advanced AI monitoring.
                        </p>
                    </div>
                    <div className="p-8 text-left border-l-2 border-[var(--nv-ink)]/20 pl-6">
                        <h3 className="text-xl font-bold mb-2">Active Cleaning</h3>
                        <p className="text-[var(--nv-muted)]">
                            We don't just monitor pollution; we actively remove it through bio-filtration.
                        </p>
                    </div>
                    <div className="p-8 text-left border-l-2 border-[var(--nv-ink)]/20 pl-6">
                        <h3 className="text-xl font-bold mb-2">Ecosystem First</h3>
                        <p className="text-[var(--nv-muted)]">
                            Focus on restoring the entire food chain, not just chemical balance.
                        </p>
                    </div>
                    <div className="p-8 text-left border-l-2 border-[var(--nv-ink)]/20 pl-6">
                        <h3 className="text-xl font-bold mb-2">Research Driven</h3>
                        <p className="text-[var(--nv-muted)]">
                            Continuous AI analysis creates a feedback loop for better restoration techniques.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 6: Traction (Signal) ---
const Slide6_Traction = () => {
    return (
        <Section>
            <FadeIn className="max-w-5xl mx-auto w-full">
                <h2 className="text-4xl font-bold mb-12 text-center">
                    Real Traction. Not Just Hype.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { value: "3", label: "Signed LOIs" },
                        { value: "$1.2M", label: "Pipeline Value" },
                        { value: "2", label: "Active Pilots" },
                        { value: "500+", label: "Hours Tested" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="p-6 bg-[var(--nv-surface)] rounded-xl border border-[var(--nv-border)] text-center"
                        >
                            <div className="text-4xl font-bold text-[var(--nv-primary-strong)] mb-2">
                                {stat.value}
                            </div>
                            <div className="text-xs uppercase tracking-widest text-[var(--nv-muted)]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 7: Market (Reachability) ---
const Slide7_Market = () => {
    return (
        <Section>
            <FadeIn className="flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-12">The Market</h2>
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                    {/* Outer Circle */}
                    <div className="absolute inset-0 rounded-full border border-[var(--nv-border)]/20 flex items-center justify-center">
                        <span className="absolute top-4 text-[var(--nv-muted)] text-sm uppercase">
                            TAM: $50B (Global Monitor)
                        </span>
                    </div>
                    {/* Middle Circle */}
                    <div className="absolute inset-[15%] rounded-full border border-[var(--nv-border)]/50 bg-[var(--nv-surface)]/20 flex items-center justify-center">
                        <span className="absolute top-4 text-[var(--nv-ink)] text-sm uppercase font-bold">
                            SAM: $12B (Indus. Water)
                        </span>
                    </div>
                    {/* Inner Circle */}
                    <div className="absolute inset-[35%] rounded-full bg-[var(--nv-primary-strong)]/20 border border-[var(--nv-primary-strong)] flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">$250M</div>
                            <div className="text-[10px] uppercase tracking-wider text-white/80">
                                SOM: Northeast Ports
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 8: Business Model (Monetization) ---
const Slide8_BusinessModel = () => {
    return (
        <Section className="bg-[var(--nv-bg)]">
            <FadeIn className="w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">How We Make Money</h2>
                <div className="glass-surface p-12 rounded-3xl border border-[var(--nv-border)] flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">RaaS Subscription</h3>
                        <p className="text-[var(--nv-muted)]">Robotics as a Service</p>
                        <div className="mt-6 text-5xl font-bold text-[var(--nv-primary-strong)]">
                            $25k <span className="text-xl font-normal text-[var(--nv-muted)]">/mo</span>
                        </div>
                        <p className="text-sm mt-2 text-[var(--nv-muted)]">Per site deployment</p>
                    </div>
                    <div className="w-px h-32 bg-[var(--nv-border)] hidden md:block" />
                    <div className="w-full h-px bg-[var(--nv-border)] md:hidden" />
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                            <p>Hardware Leasing Included</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                            <p>24/7 Remote Monitoring</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                            <p>Regulatory Compliance Reports</p>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 9: Team (Inevitability) ---
const Slide9_Team = () => {
    return (
        <Section>
            <FadeIn className="max-w-4xl mx-auto w-full">
                <h2 className="text-4xl font-bold mb-4 text-center">Built to Execute</h2>
                <p className="text-center text-[var(--nv-muted)] mb-12">
                    We have the rare combination of robotics, AI, and regulatory experience.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[var(--nv-surface)] border border-[var(--nv-border)] hover:border-[var(--nv-primary)] transition-colors">
                        <div className="text-xl font-bold mb-1">Jane Doe</div>
                        <div className="text-sm text-[var(--nv-primary-strong)] uppercase tracking-wider mb-4">CEO / Co-founder</div>
                        <p className="text-sm text-[var(--nv-muted)]">
                            Ex-SpaceX Guidance Engineer. 10 years in autonomous systems. Led a team of 50.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--nv-surface)] border border-[var(--nv-border)] hover:border-[var(--nv-primary)] transition-colors">
                        <div className="text-xl font-bold mb-1">John Smith</div>
                        <div className="text-sm text-[var(--nv-primary-strong)] uppercase tracking-wider mb-4">CTO / Co-founder</div>
                        <p className="text-sm text-[var(--nv-muted)]">
                            PhD in Computer Vision. Patented 3 sensor technologies. Built systems for Navy Seals.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </Section>
    );
};

// --- Slide 10: Momentum (Closing) ---
const Slide10_Momentum = () => {
    return (
        <Section className="bg-[radial-gradient(ellipse_at_bottom,var(--nv-surface),transparent_80%)]">
            <FadeIn className="text-center">
                <h2 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-8">
                    Join Us.
                </h2>
                <p className="text-xl text-[var(--nv-muted)] mb-12 max-w-2xl mx-auto">
                    The technology is ready. The demand is urgent. We are raising <span className="text-[var(--nv-primary-strong)] font-semibold">$1.5M Pre-Seed</span> to capture the first 10 ports.
                </p>
                <button className="px-8 py-4 bg-[var(--nv-primary)] hover:bg-[var(--nv-primary-strong)] text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,120,179,0.5)]">
                    Schedule a Meeting
                </button>
            </FadeIn>
        </Section>
    );
};

// --- Main Page Component ---

export default function PitchDeckPage() {
    const { scrollYProgress } = useScroll();

    return (
        <main className="w-full bg-[var(--nv-bg)] text-[var(--nv-ink)] selection:bg-[var(--nv-selection)]">
            <motion.div
                className="fixed top-0 left-0 w-full h-1 bg-[var(--nv-primary)] origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            <Slide1_Clarity />
            <Slide2_Problem />
            <Slide3_Solution />
            <Slide4_Wedge />
            <Slide5_Differentiation />
            <Slide6_Traction />
            <Slide7_Market />
            <Slide8_BusinessModel />
            <Slide9_Team />
            <Slide10_Momentum />
        </main>
    );
}
