import React from 'react';
import { WeatherCard } from './WeatherCard';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Alert {
    type: string;
    message: string;
}

interface AlertsProps {
    alerts: Alert[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
    if (alerts.length === 0) return null;

    return (
        <WeatherCard colSpan={2} className="border-l-4 border-l-red-500 bg-red-500/5 dark:bg-red-500/10">
            <div className="flex items-start gap-4">
                <div className="bg-red-500 p-2 rounded-xl text-white">
                    <AlertTriangle size={24} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                            {alerts[0].type}
                        </h3>
                        <span className="text-[10px] font-bold bg-red-500/10 text-red-600 px-2 py-0.5 rounded-full">
                            Active Now
                        </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {alerts[0].message}
                    </p>
                </div>
            </div>

            <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full flex items-center justify-between text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 py-2.5 px-4 rounded-xl transition-colors"
            >
                VIEW EMERGENCY PROTOCOL
                <ChevronRight size={14} />
            </motion.button>
        </WeatherCard>
    );
};
