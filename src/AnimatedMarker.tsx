import { useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

interface AnimatedMarkerProps {
  position: [number, number];
  icon: L.DivIcon;
  duration?: number;
  popupContent?: React.ReactNode;
}

function AnimatedMarker({ position, icon, duration = 2000, popupContent }: AnimatedMarkerProps) {
  const markerRef = useRef<L.Marker>(null);
  const map = useMap();

  useEffect(() => {
    if (markerRef.current && position) {
      const marker = markerRef.current;
      const startLatLng = marker.getLatLng();
      const endLatLng = L.latLng(position);

      if (startLatLng.lat === 0 && startLatLng.lng === 0) {
        marker.setLatLng(endLatLng);
        return;
      }

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / duration);

        const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
        const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;

        marker.setLatLng([lat, lng]);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          marker.setLatLng(endLatLng);
        }
      };

      requestAnimationFrame(animate);
      map.panTo(endLatLng, { animate: true, duration: 1 });
    }
  }, [position, duration, map]);

  return (
    <Marker ref={markerRef} position={position} icon={icon}>
      {popupContent && <Popup>{popupContent}</Popup>}
    </Marker>
  );
}

export default AnimatedMarker;
