import React, { useEffect, useState } from 'react';
import { WeatherCard } from './WeatherCard';
import { Cloud, Sun, CloudRain, CloudLightning } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface HeroCardProps {
    city: string;
    temp: number;
    condition: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({ city, temp, condition }) => {
    const [displayTemp, setDisplayTemp] = useState(0);

    // Count up effect using framer motion hooks for smoothness
    const springTemp = useSpring(0, { stiffness: 40, damping: 20 });
    const rounded = useTransform(springTemp, (latest) => Math.round(latest));

    useEffect(() => {
        springTemp.set(temp);
    }, [temp, springTemp]);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            setDisplayTemp(latest);
        });
        return () => unsubscribe();
    }, [rounded]);

    const WeatherIcon = () => {
        switch (condition.toLowerCase()) {
            case 'sunny': return <Sun className="w-16 h-16 text-yellow-500 animate-[spin_10s_linear_infinite]" />;
            case 'rain': return <CloudRain className="w-16 h-16 text-blue-500 animate-bounce" />;
            case 'lightning': return <CloudLightning className="w-16 h-16 text-purple-500 animate-pulse" />;
            default: return (
                <motion.div
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Cloud className="w-16 h-16 text-slate-400" />
                </motion.div>
            );
        }
    };

    return (
        <WeatherCard colSpan={2} className="relative justify-between">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-slate-900/80 dark:text-white/80">{city}</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">{condition}</p>
                </div>
                <WeatherIcon />
            </div>

            <div className="mt-8">
                <div className="flex items-start">
                    <span className="text-8xl md:text-9xl font-bold tracking-tighter text-slate-900 dark:text-white">
                        {displayTemp}
                    </span>
                    <span className="text-4xl md:text-5xl font-light mt-4 text-slate-400">°C</span>
                </div>
            </div>
        </WeatherCard>
    );
};
