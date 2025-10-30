import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapControlsProps {
  mapType: 'map' | 'satellite';
}

function MapControls({ mapType }: MapControlsProps) {
  const map = useMap();

  useEffect(() => {
    const zoomControl = map.zoomControl;
    if (zoomControl) {
      zoomControl.setPosition('bottomright');
    }
  }, [map]);

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapType === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
    }
  }, [mapType, map]);

  return null;
}

export default MapControls;
