'use client';

import { useEffect, useRef } from 'react';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

export default function TrackAsiaMap({ latitude, longitude, name }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!mapRef.current || initialized.current) return;
    initialized.current = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/trackasia-gl@1.15.2/dist/trackasia-gl.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/trackasia-gl@1.15.2/dist/trackasia-gl.js';
    script.onload = () => {
      const TA = (window as any).trackasiagl;
      const map = new TA.Map({
        container: mapRef.current!,
        style: `https://maps.track-asia.com/styles/v1/style.json?key=b4948621d117757258530daee9e48a980b`,
        center: [longitude, latitude],
        zoom: 15,
        attributionControl: false,
      });
      map.addControl(new TA.AttributionControl({ compact: true }));
      map.on('load', () => {
        new TA.Marker({ color: '#8B1A1A' })
          .setLngLat([longitude, latitude])
          .setPopup(new TA.Popup({ offset: 25 }).setText(name))
          .addTo(map);
      });
    };
    document.head.appendChild(script);
  }, [latitude, longitude, name]);

  return <div ref={mapRef} style={{ width: '100%', height: '300px', borderRadius: '16px' }} />;
}