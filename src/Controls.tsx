import { Play, Pause, ChevronUp, X, Minus, Plus } from 'lucide-react';
import { RoutePoint } from './utils';

interface ControlsProps {
  currentIndex: number;
  routeData: RoutePoint[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSliderChange: (value: number) => void;
  onClose: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
}

function Controls({
  currentIndex,
  routeData,
  isPlaying,
  onTogglePlay,
  onSliderChange,
  onClose,
  playbackSpeed,
  onSpeedChange,
}: ControlsProps) {
  const maxIndex = routeData.length - 1;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white shadow-2xl rounded-t-2xl">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg"
              style={{ backgroundColor: '#4F46E5' }}
            >
              {isPlaying ? (
                <Pause size={24} fill="white" stroke="white" />
              ) : (
                <Play size={24} fill="white" stroke="white" className="ml-1" />
              )}
            </button>

            <button
              onClick={() => onSpeedChange(Math.max(0.5, playbackSpeed - 0.5))}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all shadow-md"
              disabled={playbackSpeed <= 0.5}
            >
              <Minus size={20} stroke="white" />
            </button>

            <div className="text-sm font-semibold text-gray-700 min-w-[60px] text-center">
              {playbackSpeed}x
            </div>

            <button
              onClick={() => onSpeedChange(Math.min(3, playbackSpeed + 0.5))}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all shadow-md"
              disabled={playbackSpeed >= 3}
            >
              <Plus size={20} stroke="white" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg"
          >
            <X size={24} stroke="white" />
          </button>
        </div>

        <div className="relative">
          <input
            type="range"
            min={0}
            max={maxIndex}
            value={currentIndex}
            onChange={(e) => onSliderChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${(currentIndex / maxIndex) * 100}%, #E5E7EB ${(currentIndex / maxIndex) * 100}%, #E5E7EB 100%)`
            }}
          />
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{currentIndex + 1} / {routeData.length}</span>
          <span>{Math.round((currentIndex / maxIndex) * 100)}%</span>
        </div>
      </div>

      <div className="border-t px-6 py-4">
        <button
          onClick={() => {}}
          className="w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors py-2"
        >
          <h2 className="text-lg font-semibold text-gray-800">Configure</h2>
          <ChevronUp size={24} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Controls;
