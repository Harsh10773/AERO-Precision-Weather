import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants, hoverEffect } from '../../utils/animations';
import { cn } from '../../utils/cn';

interface WeatherCardProps {
    children: React.ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3 | 4;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    children,
    className,
    colSpan = 1,
    rowSpan = 1
}) => {
    const spanClasses = {
        col: {
            1: 'col-span-1',
            2: 'md:col-span-2',
            3: 'md:col-span-3',
            4: 'md:col-span-4',
        }[colSpan],
        row: {
            1: 'row-span-1',
            2: 'md:row-span-2',
            3: 'md:row-span-3',
            4: 'md:row-span-4',
        }[rowSpan],
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={hoverEffect}
            className={cn(
                "glass rounded-3xl p-6 flex flex-col overflow-hidden relative",
                spanClasses.col,
                spanClasses.row,
                className
            )}
        >
            {children}
        </motion.div>
    );
};
