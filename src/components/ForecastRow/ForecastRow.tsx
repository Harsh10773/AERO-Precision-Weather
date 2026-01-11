import React from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudDrizzle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ForecastRowProps {
    day: string;
    temp: number;
    condition: string;
}

export const ForecastRow: React.FC<ForecastRowProps> = ({ day, temp, condition }) => {
    const WeatherIcon = () => {
        switch (condition.toLowerCase()) {
            case 'sunny': return <Sun size={20} className="text-yellow-500" />;
            case 'rain': return <CloudRain size={20} className="text-blue-500" />;
            case 'cloudy': return <Cloud size={20} className="text-slate-400" />;
            case 'lightning': return <CloudLightning size={20} className="text-purple-500" />;
            default: return <CloudDrizzle size={20} className="text-slate-400" />;
        }
    };

    return (
        <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
        >
            <span className="w-10 text-sm font-bold text-slate-900 dark:text-white">{day}</span>
            <div className="flex items-center gap-3">
                <WeatherIcon />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-20 capitalize">{condition}</span>
            </div>
            <div className="flex items-end gap-1">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{temp}°</span>
                <span className="text-[10px] text-slate-400 mb-0.5">/ {temp - 5}°</span>
            </div>
        </motion.div>
    );
};
