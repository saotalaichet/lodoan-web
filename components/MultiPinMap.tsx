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

        markers.forEach((m, idx) => {
          const el = document.createElement('div');
          el.style.cursor = 'pointer';
          const size = m.isCurrent ? 44 : 36;

          if (m.isCurrent) {
            el.innerHTML = `
              <svg width="${size}" height="${size}" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));">
                <circle cx="22" cy="22" r="20" fill="${primaryColor}" stroke="#fff" stroke-width="3"/>
                <path d="M22 11l3.09 6.26L32 18.27l-5 4.87 1.18 6.88L22 26.77l-6.18 3.25L17 23.14l-5-4.87 6.91-1.01L22 11z" fill="#fff"/>
              </svg>
            `;
          } else {
            el.innerHTML = `
              <svg width="${size}" height="${size}" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                <circle cx="18" cy="18" r="16" fill="#fff" stroke="${primaryColor}" stroke-width="3"/>
                <text x="18" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="${primaryColor}" text-anchor="middle">${idx + 1}</text>
              </svg>
            `;
          }

          const popupHtml = `<div style="padding:4px 8px;font-weight:600">${m.name.replace(/</g, '&lt;')}</div>`;

          new (trackasiagl as any).Marker({ element: el, anchor: 'center' })
            .setLngLat([m.longitude, m.latitude])
            .setPopup(new (trackasiagl as any).Popup({ offset: 22 }).setHTML(popupHtml))
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
