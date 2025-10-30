import { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface ConfigurePanelProps {
  onShow: () => void;
}

function ConfigurePanel({ onShow }: ConfigurePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [deviceType, setDeviceType] = useState('WIRELESS');
  const [timePeriod, setTimePeriod] = useState('Today');
  const [showTimePeriodDropdown, setShowTimePeriodDropdown] = useState(false);

  const timePeriods = [
    'Today',
    'Yesterday',
    'This Week',
    'Previous Week',
    'This Month',
    'Previous Month',
    'Custom',
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white shadow-2xl">
      <div
        className="px-6 py-4 flex items-center justify-between cursor-pointer border-b hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-gray-800">Configure</h2>
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isExpanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>
      </div>

      {isExpanded && (
        <div className="px-6 py-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="WIRELESS">WIRELESS</option>
                <option value="GPS">GPS</option>
                <option value="HYBRID">HYBRID</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                size={20}
              />
            </div>

            <div className="flex-1 min-w-[200px] relative">
              <div
                onClick={() => setShowTimePeriodDropdown(!showTimePeriodDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-between"
              >
                <span>{timePeriod}</span>
                <ChevronDown size={20} className="text-gray-400" />
              </div>

              {showTimePeriodDropdown && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                  {timePeriods.map((period) => (
                    <div
                      key={period}
                      onClick={() => {
                        setTimePeriod(period);
                        setShowTimePeriodDropdown(false);
                      }}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                        timePeriod === period ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {period}
                    </div>
                  ))}
                </div>
              )}
            </div>

<button
              onClick={() => {
                // Reset functionality can be added here if needed
              }}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center"
              title="Reset"
            >
              <RefreshCw size={20} className="text-gray-600" />
            </button>

            <button
              onClick={onShow}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="text-lg">▶</span> SHOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfigurePanel;
