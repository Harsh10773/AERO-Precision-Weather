# AERO | Precision Weather Station

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38b2ac.svg)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-12-ff0055.svg)

**AERO** is a high-performance, aesthetically driven weather application built for the modern web. Inspired by Swiss Minimalist design principles and the "Bento Grid" layout, AERO provides a dense yet breathable information architecture that prioritizes typographic hierarchy and atmospheric visual feedback.

# Live Demo
https://aero-weather.netlify.app/

##  Technical Excellence

- **Framework**: React 19 (Vite) for sub-second build times and HMR.
- **Styling**: Tailwind CSS v4 utilizing the new JIT engine for granular design control without the bloat.
- **Animation Engine**: Framer Motion for sophisticated orchestration of entry animations, micro-interactions, and real-time data "count-up" effects.
- **Mapping**: React-Leaflet integration with custom conic-gradient radar overlays and interactive location sync.
- **State Management**: Robust React Hooks and Functional Programming patterns for optimized re-renders.

##  Design Philosophy: "Swiss Minimalism"

- **Negative Space**: Strategic use of padding and margins to prevent data clutter.
- **Typographic Hierarchy**: Large, semi-bold sans-serif fonts for primary metrics (Temperature, City) contrasting with monospaced tracking for secondary metadata.
- **Atmospheric Feedback**: A dynamic background "glow" system that shifts color based on weather conditions (Sunny, Rain, Cloudy), providing an immediate emotional context to the data.
- **Glassmorphism**: High-transparency solid surfaces with `backdrop-blur-md` and `1px` translucent borders for depth and elevation.

##  Key Features

- **Geolocation**: Real-time user position detection via browser API.
- **Worldwide Search**: Debounced city search with deterministic mock data generation for demo purposes.
- **Interactive Map**: Live radar sweep visualization centered on the selected location.
- **Bento Utility Core**:
  - **Wind Dynamics**: Circular animated gauge for speed and direction.
  - **Solar Progress**: Parabolic arc representing the sunrise/sunset cycle.
  - **7-Day Evolution**: Vertical list forecasting with custom icon sets.
  - **Critical Alerts**: High-urgency zone for weather advisories.
  - **Metric Deep-Dive**: Air Quality, UV Index, Humidity, Visibility, and Pressure widgets.

##  Project Structure

```text
src/
├── components/         # Atomic & Composite UI Components
│   ├── WeatherCard/    # Core Bento widgets (Hero, Wind, Sun, etc.)
│   ├── MapWidget/      # Leaflet integration & Radar FX
│   └── ForecastRow/    # List items for weekly trends
├── data/               # Mock data & Dynamic generators
├── utils/              # Animation variants & Tailwind mergers
└── App.tsx             # Main App Shell & State Orchestration
```

## 🛠 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Harsh10773/AERO-Precision-Weather.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---


