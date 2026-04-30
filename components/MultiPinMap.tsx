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
          el.style.cursor = 'pointer';
          const w = m.isCurrent ? 36 : 30;
          const h = m.isCurrent ? 46 : 38;
          const fill = m.isCurrent ? primaryColor : '#fff';
          const stroke = m.isCurrent ? '#fff' : primaryColor;
          const strokeWidth = m.isCurrent ? 2 : 3;
          const dotR = m.isCurrent ? 4 : 3;
          const dotFill = m.isCurrent ? '#fff' : primaryColor;
          el.innerHTML = `
            <svg width="${w}" height="${h}" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 8 12 20 12 20s12-12 12-20c0-6.6-5.4-12-12-12z" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>
              <circle cx="12" cy="12" r="${dotR}" fill="${dotFill}"/>
            </svg>
          `;

          const popupHtml = `<div style="padding:4px 8px;font-weight:600">${m.name.replace(/</g, '&lt;')}</div>`;

          new (trackasiagl as any).Marker({ element: el, anchor: 'bottom' })
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
