'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MapPin, Phone, Clock, Navigation, ArrowRight } from 'lucide-react';

const MultiPinMap = dynamic(() => import('@/components/MultiPinMap'), {
  ssr: false,
  loading: () => (
    <div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center">
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
    locating: 'Đang xác định vị trí của bạn...',
    youAreHere: 'Bạn đang ở đây',
    orderHere: 'Đặt món tại đây',
    viewDetails: 'Xem chi tiết',
    today: 'Hôm nay',
    openNow: 'Đang mở',
    closed: 'Đã đóng',
    km: 'km',
    m: 'm',
    directions: 'Chỉ đường',
    call: 'Gọi',
  },
  en: {
    locating: 'Finding your location...',
    youAreHere: 'You are here',
    orderHere: 'Order from here',
    viewDetails: 'View details',
    today: 'Today',
    openNow: 'Open now',
    closed: 'Closed',
    km: 'km',
    m: 'm',
    directions: 'Directions',
    call: 'Call',
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

function isOpenNow(hours?: Record<string, string>): boolean {
  if (!hours) return false;
  const now = new Date();
  const todayKey = DAYS_KEY[now.getDay()];
  const todayHours = hours[todayKey];
  if (!todayHours || todayHours.toLowerCase() === 'closed') return false;

  const match = todayHours.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
  if (!match) return false;

  const [, openH, openM, closeH, closeM] = match;
  const openMinutes = parseInt(openH) * 60 + parseInt(openM);
  const closeMinutes = parseInt(closeH) * 60 + parseInt(closeM);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (closeMinutes < openMinutes) {
    return nowMinutes >= openMinutes || nowMinutes < closeMinutes;
  }
  return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
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
      return { ...s, _lat: validLat, _lon: validLon, _distance: distance, _isOpen: isOpenNow(s.hours) };
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

  let siblingPosition = 0;
  const mapMarkers = sorted
    .filter((s) => s._lat !== null && s._lon !== null)
    .map((s) => {
      const isCurrent = s.slug === currentSlug;
      const position = isCurrent ? null : ++siblingPosition;
      return {
        latitude: s._lat as number,
        longitude: s._lon as number,
        name: s.name,
        slug: s.slug,
        isCurrent,
        position,
        logo: s.logo,
        hours: s.hours,
        address: s.address,
      };
    });

  const todayKey = DAYS_KEY[new Date().getDay()];

  return (
    <div className="space-y-5">
      {geoStatus === 'requesting' && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800 flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin flex-shrink-0" />
          <span>{t.locating}</span>
        </div>
      )}
      {mapMarkers.length > 0 && (
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <MultiPinMap markers={mapMarkers} userCoords={userCoords} lang={lang} />
        </div>
      )}

      <div className="space-y-3">
        {(() => {
          let cardSiblingPos = 0;
          return sorted.map((s) => {
            const isCurrent = s.slug === currentSlug;
            const cardPosition = isCurrent ? null : ++cardSiblingPos;
            const todayHours = s.hours?.[todayKey];
            const isOpen = s._isOpen;
            return (
            <div
              key={s.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    {s.logo ? (
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="w-20 h-20 rounded-2xl object-contain bg-gray-50 border border-gray-100"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-gray-300" />
                      </div>
                    )}
                    <div className={`absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white ${
                      isCurrent ? 'bg-primary' : 'bg-white border-2 border-primary'
                    }`}>
                      {isCurrent ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L14.39 8.26L21 9.27L16 14.14L17.18 21L12 17.77L6.82 21L8 14.14L3 9.27L9.61 8.26L12 2Z"/>
                        </svg>
                      ) : (
                        <span className="text-xs font-black text-primary">{cardPosition}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{s.name}</h3>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-primary text-white font-bold flex-shrink-0 uppercase tracking-wider">
                          {t.youAreHere}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isOpen
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                        {isOpen ? t.openNow : t.closed}
                      </span>
                      {s._distance !== null && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600">
                          <Navigation className="w-3 h-3" />
                          {formatDistance(s._distance, lang)}
                        </span>
                      )}
                    </div>

                    {s.address && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-1.5 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="truncate">{s.address}</span>
                      </p>
                    )}

                    {todayHours && (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span>
                          {t.today}: <span className="font-semibold text-gray-700">{todayHours}</span>
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3 flex items-center gap-2">
                <Link
                  href={`/${s.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all bg-primary text-white hover:opacity-90 shadow-sm"
                >
                  {t.orderHere}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {s.address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.directions}
                    aria-label={t.directions}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition-all flex-shrink-0"
                  >
                    <Navigation className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                {s.phone && (
                  <a
                    href={`tel:${s.phone}`}
                    title={t.call}
                    aria-label={t.call}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition-all flex-shrink-0"
                  >
                    <Phone className="w-4 h-4 text-gray-600" />
                  </a>
                )}
              </div>
            </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
