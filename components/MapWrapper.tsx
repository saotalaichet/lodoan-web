'use client';
import dynamic from 'next/dynamic';

const TrackAsiaMap = dynamic(() => import('@/components/TrackAsiaMap'), { ssr: false });

export default function MapWrapper({ latitude, longitude, name }: { latitude: number; longitude: number; name: string }) {
  return <TrackAsiaMap latitude={latitude} longitude={longitude} name={name} />;
}