import React, { useEffect } from 'react';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import L from 'leaflet';

// Fix for Leaflet default icon issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Internal component to handle view resetting
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 12);
    }, [center, map]);
    return null;
}

interface MapWidgetProps {
    lat: number;
    lon: number;
}

export const MapWidget: React.FC<MapWidgetProps> = ({ lat, lon }) => {
    const position: [number, number] = [lat, lon];

    return (
        <WeatherCard colSpan={2} rowSpan={2} className="p-0 overflow-hidden relative group">
            <div className="absolute inset-0 z-0">
                <MapContainer center={position} zoom={12} zoomControl={false} scrollWheelZoom={false} attributionControl={false}>
                    <ChangeView center={position} />
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={position} />
                    <Circle
                        center={position}
                        radius={2000}
                        pathOptions={{ fillColor: 'rgb(59, 130, 246)', fillOpacity: 0.1, color: 'rgb(59, 130, 246)', weight: 1 }}
                    />
                </MapContainer>
            </div>

            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.15) 0deg, rgba(59, 130, 246, 0.05) 90deg, transparent 180deg)'
                    }}
                />
                <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/30" />
            </div>

            <div className="absolute top-4 left-4 z-20 glass px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg">
                Local Radar
            </div>

            <div className="absolute bottom-4 left-4 z-20 glass p-3 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tighter">Live Monitoring</span>
                </div>
            </div>
        </WeatherCard>
    );
};
