import React from 'react';

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`glass rounded-3xl p-6 animate-pulse ${className}`}>
        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6 opacity-50" />
        <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
        <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-900 rounded-lg opacity-30" />
    </div>
);

export const WeatherSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Main Grid Skeleton */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <SkeletonCard className="md:col-span-2 h-64" />
                <div className="flex flex-col gap-6">
                    <SkeletonCard className="h-28" />
                    <SkeletonCard className="h-28" />
                </div>
                <SkeletonCard className="md:col-span-2 h-80" />
                <div className="flex flex-col gap-6">
                    <SkeletonCard className="h-36" />
                    <SkeletonCard className="h-36" />
                </div>
                <SkeletonCard className="h-48" />
                <SkeletonCard className="h-48" />
                <SkeletonCard className="h-48" />
            </div>

            {/* Sidebar Skeleton */}
            <div className="flex flex-col gap-6">
                <SkeletonCard className="flex-1 min-h-[400px]" />
                <SkeletonCard className="h-32" />
                <SkeletonCard className="h-40 bg-blue-500/10" />
            </div>
        </div>
    );
};
