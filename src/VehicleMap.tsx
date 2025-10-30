import { useState, useEffect, useRef } from 'react';
import { MapContainer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, Satellite, User } from 'lucide-react';
import AnimatedMarker from './AnimatedMarker';
import ConfigurePanel from './ConfigurePanel';
import MapControls from './MapControls';
import { RoutePoint, calculateSpeedKmH } from './utils';
import Controls from './Controls';

const INITIAL_CENTER: [number, number] = [17.385044, 78.486671];

function VehicleMap() {
  const [routeData, setRouteData] = useState<RoutePoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mapType, setMapType] = useState<'map' | 'satellite'>('map');
  const [showConfigure, setShowConfigure] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/dummy-route.json');
        const data = await response.json();

        setRouteData(
          data.map((p: { latitude: number; longitude: number; timestamp: string }) => ({
            lat: p.latitude,
            lng: p.longitude,
            timestamp: p.timestamp,
          }))
        );
      } catch (error) {
        console.error('Error loading route data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isPlaying && routeData.length > 0 && currentIndex < routeData.length - 1) {
      const delay = 1000 / playbackSpeed;
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= routeData.length - 1) {
            setIsPlaying(false);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, delay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, routeData, playbackSpeed]);

  const currentPosition = routeData[currentIndex] || routeData[0];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleShowClick = () => {
    setShowConfigure(false);
    setShowTracking(true);
  };

  const handleClose = () => {
    setShowTracking(false);
    setShowConfigure(false);
    setIsPlaying(false);
    setCurrentIndex(0);
    setIsSliderActive(false);
  };

  const handleSliderChange = (value: number) => {
    setCurrentIndex(value);
    setIsSliderActive(true);
    setIsPlaying(false);
  };

  const handleDriverIconClick = () => {
    setShowConfigure(true);
  };

  const fullRouteCoords: [number, number][] = routeData.map((p) => [p.lat, p.lng]);
  const traveledRouteCoords: [number, number][] = routeData
    .slice(0, currentIndex + 1)
    .map((p) => [p.lat, p.lng]);

  const driverIcon = L.divIcon({
    className: 'driver-marker',
    html: `<div style="background: #DC2626; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const vehicleColor = isSliderActive || isPlaying ? '#22C55E' : '#DC2626';
  const vehicleIcon = L.divIcon({
    className: 'vehicle-icon',
    html: `<div style="background: ${vehicleColor}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });


  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        <button
          onClick={() => setMapType('map')}
          className={`px-4 py-2 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2 ${
            mapType === 'map'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <MapIcon size={18} />
          Map
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={`px-4 py-2 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2 ${
            mapType === 'satellite'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Satellite size={18} />
          Satellite
        </button>
      </div>

      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={handleDriverIconClick}
          className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-all flex items-center justify-center"
          title="Show Driver"
        >
          <User size={24} />
        </button>
      </div>

      <MapContainer
        center={INITIAL_CENTER}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full z-0"
      >
        <MapControls mapType={mapType} />

        {showTracking && routeData.length > 0 && (
          <>
            <Polyline
              pathOptions={{ color: '#22C55E', weight: 5, opacity: 0.8 }}
              positions={fullRouteCoords}
            />

            {currentPosition && (
              <Marker
                position={[currentPosition.lat, currentPosition.lng]}
                icon={vehicleIcon}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-3 text-gray-800">Vehicle Status</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Coordinates</p>
                        <p className="text-sm font-medium text-gray-800">{currentPosition.lat?.toFixed(6)}, {currentPosition.lng?.toFixed(6)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Speed</p>
                        <p className="text-sm font-medium text-gray-800">{calculateSpeedKmH(currentIndex, routeData)} km/h</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-sm font-medium text-gray-800">{new Date(currentPosition.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Progress</p>
                        <p className="text-sm font-medium text-gray-800">{currentIndex + 1} / {routeData.length} ({Math.round(((currentIndex + 1) / routeData.length) * 100)}%)</p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </>
        )}
      </MapContainer>

      {showConfigure && !showTracking && (
        <ConfigurePanel onShow={handleShowClick} />
      )}

      {showTracking && routeData.length > 0 && currentPosition && (
        <Controls
          currentIndex={currentIndex}
          routeData={routeData}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onSliderChange={handleSliderChange}
          onClose={handleClose}
          playbackSpeed={playbackSpeed}
          onSpeedChange={setPlaybackSpeed}
        />
      )}
    </div>
  );
}

export default VehicleMap;
