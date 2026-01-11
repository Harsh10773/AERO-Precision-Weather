import React from 'react';
import { WeatherCard } from './WeatherCard';
import { ForecastRow } from '../ForecastRow/ForecastRow';
import { CalendarDays } from 'lucide-react';

interface ForecastItem {
    day: string;
    temp: number;
    condition: string;
}

interface ForecastListProps {
    forecast: ForecastItem[];
}

export const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
    return (
        <WeatherCard rowSpan={2} className="flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-slate-500 dark:text-slate-400">
                <CalendarDays size={18} />
                <span className="text-sm font-semibold uppercase tracking-widest">7-Day Forecast</span>
            </div>

            <div className="flex-1">
                {forecast.map((item, index) => (
                    <ForecastRow key={index} {...item} />
                ))}
            </div>
        </WeatherCard>
    );
};
