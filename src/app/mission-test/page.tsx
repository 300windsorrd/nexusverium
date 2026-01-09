import { IntegratedMissionSystem } from "@/components/IntegratedMissionSystem";

export default function MissionTestPage() {
    return (
        <main className="min-h-screen bg-black p-4 sm:p-8">
            <h1 className="mb-8 text-3xl font-bold text-white text-center">
                Integrated Mission System Component Test
            </h1>

            <div className="mx-auto max-w-7xl border border-gray-800 rounded-2xl overflow-hidden">
                <IntegratedMissionSystem />
            </div>

            <div className="mt-8 text-center text-gray-400">
                <p>Instructions:</p>
                <ul className="list-disc list-inside">
                    <li>Verify the background image loads.</li>
                    <li>Check pulsing hotspots at specified percentages.</li>
                    <li>Hover to see glassmorphism cards.</li>
                    <li>Click hotspots on mobile.</li>
                </ul>
            </div>
        </main>
    );
}
