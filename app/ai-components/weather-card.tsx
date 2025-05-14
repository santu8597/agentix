import { Card, CardContent } from "@/components/ui/card";
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, Wind, Zap, Droplets, Snowflake } from "lucide-react";
import { JSX } from "react";

type WeatherData = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windGust: number;
  conditions: string;
  location: string;
};

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const map: Record<string, JSX.Element> = {
    "Clear sky": <Sun className="h-10 w-10 text-yellow-500" />,
    "Mainly clear": <Sun className="h-10 w-10 text-yellow-400" />,
    "Partly cloudy": <CloudSun className="h-10 w-10 text-orange-400" />,
    "Overcast": <Cloud className="h-10 w-10 text-gray-500" />,
    "Foggy": <Cloud className="h-10 w-10 text-gray-400" />,
    "Light drizzle": <Droplets className="h-10 w-10 text-blue-400" />,
    "Moderate drizzle": <CloudRain className="h-10 w-10 text-blue-500" />,
    "Dense drizzle": <Droplets className="h-10 w-10 text-blue-600" />,
    "Slight rain": <CloudRain className="h-10 w-10 text-blue-400" />,
    "Moderate rain": <CloudRain className="h-10 w-10 text-blue-500" />,
    "Heavy rain": <Droplets className="h-10 w-10 text-blue-600" />,
    "Slight rain showers": <CloudRain className="h-10 w-10 text-blue-400" />,
    "Moderate rain showers": <CloudRain className="h-10 w-10 text-blue-500" />,
    "Violent rain showers": <CloudRain className="h-10 w-10 text-blue-700" />,
    "Slight snow fall": <Snowflake className="h-10 w-10 text-cyan-300" />,
    "Moderate snow fall": <Snowflake className="h-10 w-10 text-cyan-400" />,
    "Heavy snow fall": <Snowflake className="h-10 w-10 text-cyan-500" />,
    "Slight snow showers": <CloudSnow className="h-10 w-10 text-cyan-400" />,
    "Heavy snow showers": <CloudSnow className="h-10 w-10 text-cyan-600" />,
    "Thunderstorm": <Zap className="h-10 w-10 text-yellow-500" />,
    "Thunderstorm with slight hail": <Zap className="h-10 w-10 text-indigo-600" />,
    "Thunderstorm with heavy hail": <Zap className="h-10 w-10 text-indigo-700" />,
  };

  return map[condition] || <Cloud className="h-10 w-10 text-gray-500" />;
};

export const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <Card className="max-w-md p-6 rounded-2xl shadow-lg bg-gradient-to-br from-sky-100 to-white">
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{data?.location}</h2>
          <div className="text-gray-600">{data?.conditions}</div>
        </div>

        <div className="flex items-center justify-center">
          {getWeatherIcon(data.conditions)}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 w-full text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Temperature:</span>
            <span className="font-medium">{data?.temperature}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Feels like:</span>
            <span className="font-medium">{data?.feelsLike}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Humidity:</span>
            <span className="font-medium">{data?.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Wind Speed:</span>
            <span className="font-medium">{data?.windSpeed} km/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Wind Gust:</span>
            <span className="font-medium">{data?.windGust} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
