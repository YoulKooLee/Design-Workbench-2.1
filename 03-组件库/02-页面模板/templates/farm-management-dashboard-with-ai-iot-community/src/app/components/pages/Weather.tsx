import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CloudRain, Sun, Wind, Droplets, Thermometer, Eye } from 'lucide-react';
import { zhText } from '../localization';

export function Weather() {
  const currentWeather = {
    temp: 24,
    condition: 'Sunny',
    feelsLike: 26,
    wind: '12 km/h',
    humidity: '68%',
    visibility: '10 km',
    pressure: '1013 hPa'
  };

  const forecast = [
    { day: 'Mon', high: 24, low: 16, condition: '☀️', rain: 0 },
    { day: 'Tue', high: 26, low: 18, condition: '⛅', rain: 10 },
    { day: 'Wed', high: 22, low: 14, condition: '🌧️', rain: 80 },
    { day: 'Thu', high: 20, low: 12, condition: '🌧️', rain: 90 },
    { day: 'Fri', high: 23, low: 15, condition: '⛅', rain: 30 },
    { day: 'Sat', high: 25, low: 17, condition: '☀️', rain: 5 },
    { day: 'Sun', high: 27, low: 19, condition: '☀️', rain: 0 }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">天气与预报</h1>
        <p className="text-sm text-gray-600">天气状况和农业作业预报</p>
      </div>

      {/* Current Weather */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="text-center">
            <Sun className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-semibold">{currentWeather.temp}°C</h2>
            <p className="text-gray-600">{zhText(currentWeather.condition)}</p>
            <p className="text-sm text-gray-500">体感 {currentWeather.feelsLike}°C</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Wind, label: '风速', value: currentWeather.wind },
              { icon: Droplets, label: '湿度', value: currentWeather.humidity },
              { icon: Eye, label: '能见度', value: currentWeather.visibility },
              { icon: Thermometer, label: '气压', value: currentWeather.pressure }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 7-Day Forecast */}
      <Card className="p-4">
        <h3 className="text-base font-semibold mb-4">7 日预报</h3>
        <div className="grid grid-cols-7 gap-2">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-blue-50">
              <div className="text-xs font-medium text-gray-600">{zhText(day.day)}</div>
              <div className="text-2xl my-2">{day.condition}</div>
              <div className="text-sm text-blue-600">{day.high}°</div>
              <div className="text-xs text-gray-500">{day.low}°</div>
              <div className="text-xs text-blue-600 mt-1">{day.rain}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Agricultural Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-base font-semibold mb-3">生长条件</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">温度范围</span>
              <Badge className="bg-green-100 text-green-800">理想</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">湿度水平</span>
              <Badge className="bg-green-100 text-green-800">良好</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">风速</span>
              <Badge className="bg-yellow-100 text-yellow-800">中等</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-base font-semibold mb-3">建议</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <CloudRain className="h-4 w-4 text-blue-500 mt-0.5" />
              <span>预计周三至周四有雨，A 地块可暂停灌溉。</span>
            </div>
            <div className="flex items-start space-x-2">
              <Sun className="h-4 w-4 text-yellow-500 mt-0.5" />
              <span>周五适合作物喷洒作业。</span>
            </div>
            <div className="flex items-start space-x-2">
              <Wind className="h-4 w-4 text-blue-500 mt-0.5" />
              <span>无人机作业前请监控风速。</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
