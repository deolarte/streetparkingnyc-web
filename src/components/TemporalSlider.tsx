import React, { useState } from 'react';
import { Clock, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import { getAspHolidayStatus } from '../services/aspCalendar';

interface TemporalSliderProps {
  isNow: boolean;
  selectedTime: Date;
  onTimeChange: (newTime: Date, isNow: boolean) => void;
}

export const TemporalSlider: React.FC<TemporalSliderProps> = ({
  isNow,
  selectedTime,
  onTimeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 640 : true
  );
  const aspInfo = getAspHolidayStatus(selectedTime);

  const hours = selectedTime.getHours();
  const minutes = selectedTime.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Format display time
  const formattedTime = selectedTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDay = selectedTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value, 10);
    const newDate = new Date(selectedTime);
    newDate.setHours(Math.floor(mins / 60));
    newDate.setMinutes(mins % 60);
    newDate.setSeconds(0);
    onTimeChange(newDate, false);
  };

  const handleDayOffset = (offsetDays: number) => {
    const newDate = new Date(selectedTime);
    newDate.setDate(newDate.getDate() + offsetDays);
    onTimeChange(newDate, false);
  };

  const handleResetToNow = () => {
    onTimeChange(new Date(), true);
  };

  const handleQuickPreset = (targetHour: number) => {
    const newDate = new Date(selectedTime);
    newDate.setHours(targetHour, 0, 0, 0);
    onTimeChange(newDate, false);
  };

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/80 dark:border-gray-800 p-2.5 sm:p-3.5 transition-all text-xs">
      {/* Top Header: Always visible compact status bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight">
                {formattedTime}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {formattedDay}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-[160px] sm:max-w-none">
              {isNow ? '🔴 Real-Time Live Feed' : '⏱️ Custom Simulated Time'}
            </p>
          </div>
        </div>

        {/* Buttons: Live Now & Mobile Expand/Collapse Toggle */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={handleResetToNow}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center space-x-1 transition-all shadow-xs ${
              isNow
                ? 'bg-emerald-600 text-white shadow-emerald-600/20 ring-2 ring-emerald-500/30'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isNow ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
            <span>Now</span>
          </button>

          {/* Toggle Expand/Collapse on Mobile */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 sm:hidden"
            aria-label="Toggle time controls"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Controls: Hidden when collapsed on small screens */}
      {isExpanded && (
        <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/80 space-y-2">
          {/* ASP Holiday Alert Banner if rules suspended */}
          {aspInfo.suspended && (
            <div className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300">
              <div className="flex items-center space-x-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-medium truncate">
                  ASP Suspended: <strong>{aspInfo.holidayName}</strong>
                </span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-200/60 dark:bg-amber-900/60 px-1 py-0.5 rounded ml-1.5 shrink-0">
                No Sweeping
              </span>
            </div>
          )}

          {/* Time Range Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-medium text-gray-500 dark:text-gray-400 px-0.5">
              <span>12 AM</span>
              <span>6 AM</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">12 PM</span>
              <span>6 PM</span>
              <span>11:45 PM</span>
            </div>

            <input
              type="range"
              min={0}
              max={1425}
              step={15}
              value={totalMinutes}
              onChange={handleSliderChange}
              aria-label="Simulation Time Slider"
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />
          </div>

          {/* Quick Day & Time Preset Pills */}
          <div className="flex flex-wrap items-center justify-between gap-1 pt-1">
            {/* Day switchers */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleDayOffset(-1)}
                className="px-2 py-0.5 text-[10px] rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="Previous Day"
              >
                ← Prev Day
              </button>
              <button
                onClick={() => handleDayOffset(1)}
                className="px-2 py-0.5 text-[10px] rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="Next Day"
              >
                Next Day →
              </button>
            </div>

            {/* Time Quick Jump Presets */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleQuickPreset(9)}
                className="px-1.5 py-0.5 text-[10px] rounded font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                9 AM (Sweep)
              </button>
              <button
                onClick={() => handleQuickPreset(14)}
                className="px-1.5 py-0.5 text-[10px] rounded font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                2 PM (Meter)
              </button>
              <button
                onClick={() => handleQuickPreset(19)}
                className="px-1.5 py-0.5 text-[10px] rounded font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                7 PM (Free)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
