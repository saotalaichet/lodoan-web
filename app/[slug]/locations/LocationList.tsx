'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MultiPinMap = dynamic(() => import('@/components/MultiPinMap'), {
  ssr: false,
  loading: () => (
    <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  ),
});

interface Location {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  latitude?: string | number;
  longitude?: string | number;
  hours?: Record<string, string>;
  is_open?: boolean;
  primary_color?: string;
}

interface LocationListProps {
  siblings: Location[];
  currentSlug: string;
  lang: 'vi' | 'en';
}

const T = {
  vi: {
    locationDenied: 'Đã từ chối quyền truy cập vị trí',
    locating: 'Đang xác định vị trí...',
    youAreHere: 'Bạn đang ở đây',
    orderHere: 'Đặt món tại đây',
    viewMap: 'Xem chi tiết',
    today: 'Hôm nay',
    km: 'km',
    m: 'm',
  },
  en: {
    locationDenied: 'Location access denied',
    locating: 'Locating...',
    youAreHere: 'You are here',
    orderHere: 'Order from here',
    viewMap: 'View details',
    today: 'Today',
    km: 'km',
    m: 'm',
  },
};

const DAYS_KEY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(km: number, lang: 'vi' | 'en'): string {
  const t = T[lang];
  if (km < 1) return `${Math.round(km * 1000)} ${t.m}`;
  if (km < 10) return `${km.toFixed(1)} ${t.km}`;
  return `${Math.round(km)} ${t.km}`;
}

export default function LocationList({ siblings, currentSlug, lang }: LocationListProps) {
  const t = T[lang];
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'>('idle');

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoStatus('unsupported');
      return;
    }
    setGeoStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.latitude, pos.coords.longitude]);
        setGeoStatus('granted');
      },
      () => {
        setGeoStatus('denied');
      },
      { timeout: 10000, maximumAge: 600000 }
    );
  }, []);

  const siblingsWithDistance = useMemo(() => {
    return siblings.map((s) => {
      const lat = typeof s.latitude === 'string' ? parseFloat(s.latitude) : s.latitude;
      const lon = typeof s.longitude === 'string' ? parseFloat(s.longitude) : s.longitude;
      const validLat = typeof lat === 'number' && !isNaN(lat) ? lat : null;
      const validLon = typeof lon === 'number' && !isNaN(lon) ? lon : null;
      let distance: number | null = null;
      if (userCoords && validLat !== null && validLon !== null) {
        distance = haversine(userCoords[0], userCoords[1], validLat, validLon);
      }
      return { ...s, _lat: validLat, _lon: validLon, _distance: distance };
    });
  }, [siblings, userCoords]);

  const sorted = useMemo(() => {
    const arr = [...siblingsWithDistance];
    if (userCoords) {
      arr.sort((a, b) => {
        if (a._distance === null && b._distance === null) return a.name.localeCompare(b.name);
        if (a._distance === null) return 1;
        if (b._distance === null) return -1;
        return a._distance - b._distance;
      });
    } else {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    }
    return arr;
  }, [siblingsWithDistance, userCoords]);

  const mapMarkers = sorted
    .filter((s) => s._lat !== null && s._lon !== null)
    .map((s) => ({
      latitude: s._lat as number,
      longitude: s._lon as number,
      name: s.name,
      slug: s.slug,
      isCurrent: s.slug === currentSlug,
    }));

  const todayKey = DAYS_KEY[new Date().getDay()];

  return (
    <div className="space-y-4">
      {geoStatus === 'denied' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-amber-800">
          {t.locationDenied}
        </div>
      )}
      {geoStatus === 'requesting' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-blue-800 flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          {t.locating}
        </div>
      )}

      {mapMarkers.length > 0 && (
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <MultiPinMap markers={mapMarkers} userCoords={userCoords} />
        </div>
      )}

      <div className="space-y-3">
        {sorted.map((s) => {
          const isCurrent = s.slug === currentSlug;
          const todayHours = s.hours?.[todayKey];
          return (
            <div
              key={s.id}
              className={`bg-white border rounded-2xl p-4 transition-all ${
                isCurrent ? 'border-primary border-2 shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex gap-3">
                {s.logo ? (
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-16 h-16 rounded-xl object-contain bg-gray-50 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-gray-900 truncate">{s.name}</p>
                    {isCurrent && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-bold flex-shrink-0">
                        {t.youAreHere}
                      </span>
                    )}
                  </div>
                  {s.address && <p className="text-xs text-gray-500 truncate">{s.address}</p>}
                  <div className="flex items-center gap-3 mt-1.5 text-xs">
                    {s._distance !== null && (
                      <span className="font-semibold text-primary">{formatDistance(s._distance, lang)}</span>
                    )}
                    {todayHours && (
                      <span className="text-gray-500">
                        {t.today}: <span className="font-medium text-gray-700">{todayHours}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Link
                  href={`/${s.slug}`}
                  className={`flex-1 text-center font-semibold py-2 rounded-xl text-sm transition-all ${
                    isCurrent
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-primary text-white hover:opacity-90'
                  }`}
                >
                  {isCurrent ? t.viewMap : t.orderHere}
                </Link>
                {s.address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Maps"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all flex-shrink-0"
                  >
                    📍
                  </a>
                )}
                {s.phone && (
                  <a
                    href={`tel:${s.phone}`}
                    aria-label="Call"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all flex-shrink-0"
                  >
                    📞
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
