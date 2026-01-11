import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { getMockWeatherByCity, type WeatherData } from './data/mockWeather';
import { HeroCard } from './components/WeatherCard/HeroCard';
import { MapWidget } from './components/MapWidget/MapWidget';
import { WindGauge } from './components/WeatherCard/WindGauge';
import { SunArc } from './components/WeatherCard/SunArc';
import { Alerts } from './components/WeatherCard/Alerts';
import { ForecastList } from './components/WeatherCard/ForecastList';
import { WeatherSkeleton } from './components/WeatherCard/Skeleton';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { containerVariants } from './utils/animations';
import { Search, MapPin, Bell, Menu, Wind, Droplets, Eye, Thermometer, Sun, Activity, RefreshCw } from 'lucide-react';

const AnimatedNumber = ({ value }: { value: number }) => {
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    return displayValue.on("change", (v) => setCurrent(v));
  }, [displayValue]);

  return <>{current}</>;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const searchTimeout = useRef<any>(null);

  const [lastUpdated, setLastUpdated] = useState("");

  const updateTimestamp = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const fetchWeather = useCallback((city: string) => {
    setLoading(true);
    setTimeout(() => {
      const data = getMockWeatherByCity(city);
      setWeather(data);
      setLoading(false);
      updateTimestamp();
    }, 1000);
  }, []);

  const handleLocationByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    try {
      // Reverse geocode to get the actual city name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      const cityName = data.address.city || data.address.town || data.address.village || data.address.suburb || "Local Area";

      const weatherData = getMockWeatherByCity(cityName);
      setWeather({ ...weatherData, lat, lon });
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      const fallbackData = getMockWeatherByCity("Local Area");
      setWeather({ ...fallbackData, lat, lon });
    } finally {
      setLoading(false);
      updateTimestamp();
    }
  }, []);


  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleLocationByCoords(position.coords.latitude, position.coords.longitude);
        setLocationError(null);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setLocationError("Permission denied. Showing default location.");
        fetchWeather("San Francisco");
      }
    );
  };

  useEffect(() => {
    getGeoLocation();
  }, [fetchWeather, handleLocationByCoords]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (value.trim().length > 2) {
      searchTimeout.current = setTimeout(() => {
        fetchWeather(value.trim());
      }, 800);
    }
  };

  const getThemeColors = () => {
    if (!weather) return "from-blue-500/5 to-purple-500/5";
    switch (weather.condition.toLowerCase()) {
      case 'sunny': return "from-orange-500/10 to-transparent";
      case 'rain': return "from-blue-600/10 to-transparent";
      default: return "from-slate-500/10 to-transparent";
    }
  };

  return (
    <div className={`min-h-screen bg-[#F5F5F7] dark:bg-[#0F172A] p-4 md:p-8 transition-colors duration-1000 selection:bg-blue-200 relative overflow-hidden`}>
      {/* Background Accent Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute -top-64 -right-64 w-[800px] h-[800px] rounded-full bg-gradient-to-br ${getThemeColors()} blur-[120px] pointer-events-none z-0`}
      />

      <main className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-10">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Wind className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">AERO</h1>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />

            <div className="flex items-center gap-4 cursor-pointer group" onClick={getGeoLocation}>
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-500 shadow-blue-500/20 shadow-lg group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</h2>
                  {lastUpdated && !loading && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 opacity-60">
                      <RefreshCw size={8} className="animate-pulse" />
                      UPDATED {lastUpdated}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {weather?.city}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500' : 'bg-green-500'} animate-pulse`} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl w-full">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search worldwide city..."
                className="w-full glass bg-white/50 dark:bg-slate-900/50 border-0 rounded-3xl py-4 pl-16 pr-6 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all outline-none font-medium"
              />
              {searchValue && (
                <button
                  onClick={() => { setSearchValue(""); fetchWeather("San Francisco"); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-blue-500 transition-colors relative">
              <Bell size={20} />
              {weather?.alerts.length ? <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" /> : null}
            </button>
            <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-blue-500 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </header>

        {loading || !weather ? (
          <WeatherSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {/* Main Area */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Massive Hero */}
              <div className="md:col-span-2">
                <HeroCard city={weather.city} temp={weather.temp} condition={weather.condition} />
              </div>

              {/* Details Column */}
              <div className="space-y-6">
                <WeatherCard className="justify-between h-32">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Thermometer size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Feels Like</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold dark:text-white"><AnimatedNumber value={weather.feelsLike} />°</span>
                    <span className="text-[10px] text-slate-400 mb-1">Standard Scale</span>
                  </div>
                </WeatherCard>

                <WeatherCard className="justify-between h-32">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Activity size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Air Quality</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold dark:text-white"><AnimatedNumber value={weather.airQuality} /></span>
                    <span className={`text-[10px] font-bold mb-1 px-2 py-0.5 rounded-full ${weather.airQuality < 50 ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {weather.airQuality < 50 ? 'FAIR' : 'MODERATE'}
                    </span>
                  </div>
                </WeatherCard>
              </div>

              {/* Map & Gauges Row */}
              <div className="md:col-span-2 ">
                <MapWidget lat={weather.lat} lon={weather.lon} />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <WindGauge speed={weather.windSpeed} direction={weather.windDirection} />
                <SunArc sunrise={weather.sunrise} sunset={weather.sunset} />
              </div>

              {/* Secondary Details Row */}
              <WeatherCard className="justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Droplets size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Humidity</span>
                </div>
                <div className="my-2">
                  <span className="text-4xl font-bold dark:text-white tracking-tighter"><AnimatedNumber value={weather.humidity} />%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${weather.humidity}%` }} className="h-full bg-blue-500" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Dew point is 15°</p>
              </WeatherCard>

              <WeatherCard className="justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Sun size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">UV Index</span>
                </div>
                <div className="my-2">
                  <span className="text-4xl font-bold dark:text-white tracking-tighter"><AnimatedNumber value={weather.uvIndex} /></span>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" />
                <p className="text-[10px] text-slate-400 mt-2">Moderate for today</p>
              </WeatherCard>

              <WeatherCard className="justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <Eye size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Visibility</span>
                </div>
                <div className="my-2">
                  <span className="text-4xl font-bold dark:text-white tracking-tighter"><AnimatedNumber value={weather.visibility} /> km</span>
                </div>
                <div className="py-1 px-3 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold w-fit">
                  EXCELLENT
                </div>
              </WeatherCard>
            </div>

            {/* Sidebar (Forecast & Alerts) */}
            <div className="space-y-6">
              <ForecastList forecast={weather.forecast} />
              <Alerts alerts={weather.alerts} />

              <WeatherCard className="bg-blue-600 dark:bg-blue-600 text-white border-0 shadow-blue-500/20">
                <div className="flex flex-col gap-4">
                  <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center">
                    <Wind size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest opacity-80">Pressure</h3>
                    <p className="text-2xl font-bold"><AnimatedNumber value={weather.pressure} /> hPa</p>
                  </div>
                  <div className="text-[10px] font-medium opacity-60">Stable conditions expected for the next 24 hours.</div>
                </div>
              </WeatherCard>
            </div>

          </motion.div>
        )}

        {locationError && (
          <div className="mt-8 glass border-amber-500/50 bg-amber-500/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-600 rounded-full flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">{locationError}</p>
          </div>
        )}

        <footer className="mt-16 pb-12 text-center">
          <div className="h-[1px] w-32 bg-slate-200 dark:bg-slate-800 mx-auto mb-8" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
            © 2026 AERO PRECISION METEOROLOGY
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
