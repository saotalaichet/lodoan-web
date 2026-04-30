'use client';

import { useEffect, useRef } from 'react';

const TRACKASIA_KEY = process.env.NEXT_PUBLIC_TRACKASIA_API_KEY || '';

interface Marker {
  latitude: number;
  longitude: number;
  name: string;
  slug: string;
  isCurrent?: boolean;
}

interface MultiPinMapProps {
  markers: Marker[];
  userCoords?: [number, number] | null;
}

export default function MultiPinMap({ markers, userCoords }: MultiPinMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const trackasiaRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current || markers.length === 0) return;

    const lats = markers.map((m) => m.latitude);
    const lons = markers.map((m) => m.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;

    const init = async () => {
      const trackasiagl = (await import('trackasia-gl')).default ?? (await import('trackasia-gl'));
      await import('trackasia-gl/dist/trackasia-gl.css');
      trackasiaRef.current = trackasiagl;

      const map = new (trackasiagl as any).Map({
        container: mapContainer.current!,
        style: `https://maps.track-asia.com/styles/v2/streets.json?key=${TRACKASIA_KEY}`,
        center: [centerLon, centerLat],
        zoom: markers.length === 1 ? 14 : 11,
      });
      mapInstance.current = map;

      map.on('load', () => {
        if (markers.length > 1) {
          map.fitBounds(
            [
              [minLon, minLat],
              [maxLon, maxLat],
            ],
            { padding: 60, maxZoom: 14, duration: 0 }
          );
        }

        const primaryColor =
          getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#8B1A1A';

        markers.forEach((m) => {
          const el = document.createElement('div');
          const size = m.isCurrent ? 32 : 26;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.background = m.isCurrent ? primaryColor : '#fff';
          el.style.border = m.isCurrent ? '3px solid #fff' : `3px solid ${primaryColor}`;
          el.style.borderRadius = '50%';
          el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
          el.style.cursor = 'pointer';

          const popupHtml = `<div style="padding:4px 8px;font-weight:600">${m.name.replace(/</g, '&lt;')}</div>`;

          new (trackasiagl as any).Marker({ element: el })
            .setLngLat([m.longitude, m.latitude])
            .setPopup(new (trackasiagl as any).Popup({ offset: 25 }).setHTML(popupHtml))
            .addTo(map);
        });
      });
    };

    init().catch(console.error);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      userMarkerRef.current = null;
    };
  }, [markers]);

  useEffect(() => {
    const map = mapInstance.current;
    const trackasiagl = trackasiaRef.current;
    if (!map || !trackasiagl) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (!userCoords) return;

    const apply = () => {
      const el = document.createElement('div');
      el.style.width = '14px';
      el.style.height = '14px';
      el.style.background = '#3b82f6';
      el.style.border = '3px solid #fff';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.3)';
      userMarkerRef.current = new (trackasiagl as any).Marker({ element: el })
        .setLngLat([userCoords[1], userCoords[0]])
        .addTo(map);
    };

    if (map.loaded()) apply();
    else map.once('load', apply);
  }, [userCoords]);

  return <div ref={mapContainer} style={{ width: '100%', height: '300px' }} />;
}
