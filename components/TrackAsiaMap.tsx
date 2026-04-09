'use client';

import { useEffect, useRef } from 'react';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

export default function TrackAsiaMap({ latitude, longitude, name }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const init = async () => {
      const trackasiagl = (await import('trackasia-gl')).default ?? await import('trackasia-gl');
      await import('trackasia-gl/dist/trackasia-gl.css');

      const map = new (trackasiagl as any).Map({
        container: mapRef.current!,
        style: 'https://maps.track-asia.com/styles/v2/streets.json?key=b4948621d117757258530daee9e48a980b',
        center: [longitude, latitude],
        zoom: 15,
      });

      mapInstance.current = map;

      map.on('load', () => {
        new (trackasiagl as any).Marker({ color: '#8B1A1A' })
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
  }, [latitude, longitude, name]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden' }}
    />
  );
}