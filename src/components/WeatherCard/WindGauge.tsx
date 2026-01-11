import React, { useEffect, useState } from 'react';
import { WeatherCard } from './WeatherCard';
import { Wind } from 'lucide-react';
import { motion, useSpring } from 'framer-motion';

interface WindGaugeProps {
    speed: number;
    direction: number;
}

export const WindGauge: React.FC<WindGaugeProps> = ({ speed, direction }) => {
    const [displaySpeed, setDisplaySpeed] = useState(0);
    const springSpeed = useSpring(0, { stiffness: 45, damping: 20 });

    useEffect(() => {
        springSpeed.set(speed);
    }, [speed, springSpeed]);

    useEffect(() => {
        const unsubscribe = springSpeed.on("change", (latest) => {
            setDisplaySpeed(latest);
        });
        return () => unsubscribe();
    }, [springSpeed]);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = (displaySpeed / 50) * circumference; // Assuming 50km/h is max for gauge

    return (
        <WeatherCard className="items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Wind size={18} />
                <span className="text-sm font-semibold uppercase tracking-widest">Wind</span>
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-200 dark:text-slate-800"
                    />
                    <motion.circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - Math.min(progress, circumference) }}
                        transition={{ type: 'spring', stiffness: 40, damping: 15 }}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(displaySpeed)}</span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">km/h</span>
                </div>

                {/* Direction Needle */}
                <motion.div
                    className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-32 origin-center pointer-events-none"
                    animate={{ rotate: direction }}
                    transition={{ type: 'spring', stiffness: 50, damping: 10 }}
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 -ml-[3px] absolute top-1" />
                </motion.div>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">NNE</span>
                <span className="text-[10px] text-slate-500">Direction</span>
            </div>
        </WeatherCard>
    );
};
