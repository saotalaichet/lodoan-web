'use client';

import { useEffect, useRef } from 'react';

const TRACKASIA_KEY = process.env.NEXT_PUBLIC_TRACKASIA_API_KEY || '';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
  primaryColor?: string;
}

export default function TrackAsiaMap({ latitude, longitude, name, primaryColor = '#8B1A1A' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const init = async () => {
      const trackasiagl = (await import('trackasia-gl')).default ?? await import('trackasia-gl');
      await import('trackasia-gl/dist/trackasia-gl.css');

      const map = new (trackasiagl as any).Map({
        container: mapRef.current!,
        style: `https://maps.track-asia.com/styles/v2/streets.json?key=${TRACKASIA_KEY}`,
        center: [longitude, latitude],
        zoom: 15,
      });

      mapInstance.current = map;

      map.on('load', () => {
        const el = document.createElement('div');
        el.style.cursor = 'default';
        el.innerHTML = `
          <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));">
            <circle cx="22" cy="22" r="20" fill="${primaryColor}" stroke="#fff" stroke-width="3"/>
            <path d="M22 11l3.09 6.26L32 18.27l-5 4.87 1.18 6.88L22 26.77l-6.18 3.25L17 23.14l-5-4.87 6.91-1.01L22 11z" fill="#fff"/>
          </svg>
        `;

        new (trackasiagl as any).Marker({ element: el, anchor: 'center' })
          .setLngLat([longitude, latitude])
          .setPopup(new (trackasiagl as any).Popup({ offset: 25 }).setText(name))
          .addTo(map);
      });
    };

    init().catch(console.error);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [latitude, longitude, name, primaryColor]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden' }}
    />
  );
}