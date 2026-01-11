import React from 'react';
import { WeatherCard } from './WeatherCard';
import { Sunset, Sunrise } from 'lucide-react';
import { motion } from 'framer-motion';

interface SunArcProps {
    sunrise: string;
    sunset: string;
}

export const SunArc: React.FC<SunArcProps> = ({ sunrise, sunset }) => {
    // Mock current progress for visualization (0.6 = 60% through the day)
    const progress = 0.65;

    // Parabola math for the sun path
    // y = a(x - h)^2 + k
    // where (h,k) is vertex. Arc goes from x=0 to x=100.
    // We'll simplify with CSS offset-path or just manual calculation.

    return (
        <WeatherCard className="justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Sunrise size={18} />
                <span className="text-sm font-semibold uppercase tracking-widest">Sun Cycle</span>
            </div>

            <div className="relative h-24 mt-4 overflow-hidden">
                {/* The Arc Path */}
                <div className="absolute bottom-0 w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[100%]" />

                {/* The Sun Icon following the arc */}
                <motion.div
                    className="absolute w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10"
                    initial={{ left: '0%', bottom: '0%' }}
                    animate={{
                        left: `${progress * 100}%`,
                        bottom: `${Math.sin(progress * Math.PI) * 80}%`
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
            </div>

            <div className="flex justify-between items-end mt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-medium">Sunrise</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{sunrise}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500 uppercase font-medium">Sunset</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{sunset}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                    <Sunset size={14} />
                    <span>4h 12m left</span>
                </div>
            </div>
        </WeatherCard>
    );
};
