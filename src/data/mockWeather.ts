export interface WeatherData {
    city: string;
    country: string;
    temp: number;
    condition: string;
    description: string;
    high: number;
    low: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    airQuality: number;
    sunrise: string;
    sunset: string;
    lat: number;
    lon: number;
    alerts: {
        type: string;
        message: string;
    }[];
    forecast: {
        day: string;
        temp: number;
        condition: string;
    }[];
}

export const getMockWeatherByCity = (city: string): WeatherData => {
    // Simple deterministic randomization based on city name for demo
    const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const temp = 10 + (hash % 20);

    return {
        city: city,
        country: "US",
        temp: temp,
        condition: hash % 3 === 0 ? "Sunny" : (hash % 3 === 1 ? "Cloudy" : "Rain"),
        description: "Light breeze and scattered clouds",
        high: temp + 4,
        low: temp - 3,
        feelsLike: temp + 1,
        humidity: 40 + (hash % 50),
        windSpeed: 5 + (hash % 15),
        windDirection: hash % 360,
        pressure: 1010 + (hash % 10),
        visibility: 5 + (hash % 10),
        uvIndex: hash % 11,
        airQuality: 20 + (hash % 80),
        sunrise: "06:45 AM",
        sunset: "06:12 PM",
        lat: 34 + (hash % 10) / 10,
        lon: -118 + (hash % 10) / 10,
        alerts: hash % 5 === 0 ? [{
            type: "Weather Advisory",
            message: "Strong winds and potential for light rain in the evening."
        }] : [],
        forecast: [
            { day: "Mon", temp: temp + 1, condition: "Cloudy" },
            { day: "Tue", temp: temp + 3, condition: "Sunny" },
            { day: "Wed", temp: temp, condition: "Rain" },
            { day: "Thu", temp: temp - 1, condition: "Cloudy" },
            { day: "Fri", temp: temp + 2, condition: "Sunny" },
            { day: "Sat", temp: temp + 4, condition: "Sunny" },
            { day: "Sun", temp: temp + 1, condition: "Partly Cloudy" },
        ]
    };
};

export const mockWeatherData = getMockWeatherByCity("San Francisco");
