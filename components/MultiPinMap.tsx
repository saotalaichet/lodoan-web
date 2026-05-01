'use client';

import { useEffect, useRef } from 'react';

const TRACKASIA_KEY = process.env.NEXT_PUBLIC_TRACKASIA_API_KEY || '';

const POPUP_DAYS_KEY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function isOpenNow(hours?: Record<string, string>): boolean {
  if (!hours) return false;
  const now = new Date();
  const todayKey = POPUP_DAYS_KEY[now.getDay()];
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

interface Marker {
  latitude: number;
  longitude: number;
  name: string;
  slug: string;
  isCurrent?: boolean;
  position?: number | null;
  logo?: string;
  hours?: Record<string, string>;
  address?: string;
  phone?: string;
}

interface MultiPinMapProps {
  markers: Marker[];
  userCoords?: [number, number] | null;
  lang?: 'vi' | 'en';
}

export default function MultiPinMap({ markers, userCoords, lang = 'vi' }: MultiPinMapProps) {
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
                <text x="18" y="23" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="${primaryColor}" text-anchor="middle">${m.position ?? ''}</text>
              </svg>
            `;
          }

          const isOpen = isOpenNow(m.hours);
          const safeName = m.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const safeLogo = m.logo ? m.logo.replace(/"/g, '&quot;') : '';
          const safeAddress = m.address
            ? m.address.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            : '';
          const validPhone = m.phone && m.phone !== 'N/A' ? m.phone : '';
          const safePhone = validPhone.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const phoneHref = validPhone.replace(/[^0-9+]/g, '');
          const statusBg = isOpen ? '#ecfdf5' : '#fef2f2';
          const statusBorder = isOpen ? '#a7f3d0' : '#fecaca';
          const statusText = isOpen ? '#047857' : '#b91c1c';
          const statusDot = isOpen ? '#10b981' : '#ef4444';
          const statusLabel = isOpen
            ? (lang === 'en' ? 'Open now' : 'Đang mở')
            : (lang === 'en' ? 'Closed' : 'Đã đóng');
          const hoursLabel = lang === 'en' ? 'Today' : 'Hôm nay';

          const todayKey = POPUP_DAYS_KEY[new Date().getDay()];
          const todayHoursStr = m.hours?.[todayKey] || '';

          const popupHtml = `
            <div style="display:flex;flex-direction:column;gap:12px;padding:14px;width:260px;max-width:calc(100vw - 60px);font-family:system-ui,-apple-system,sans-serif;">
              <div style="display:flex;gap:10px;align-items:flex-start;">
                ${safeLogo
                  ? `<img src="${safeLogo}" alt="" style="width:44px;height:44px;border-radius:10px;object-fit:contain;background:#f9fafb;border:1px solid #f3f4f6;flex-shrink:0;" />`
                  : `<div style="width:44px;height:44px;border-radius:10px;background:#f3f4f6;flex-shrink:0;"></div>`
                }
                <div style="flex:1;min-width:0;">
                  <p style="margin:0 0 6px 0;font-weight:700;font-size:14px;color:#111827;line-height:1.3;word-wrap:break-word;">${safeName}</p>
                  <span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;padding:2px 8px;border-radius:9999px;background:${statusBg};color:${statusText};border:1px solid ${statusBorder};">
                    <span style="width:6px;height:6px;border-radius:50%;background:${statusDot};display:inline-block;"></span>
                    ${statusLabel}
                  </span>
                </div>
              </div>
              ${safeAddress || safePhone || todayHoursStr ? `<div style="border-top:1px solid #f3f4f6;"></div>` : ''}
              ${safeAddress ? `
                <div style="display:flex;gap:8px;align-items:flex-start;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p style="margin:0;font-size:12px;color:#4b5563;line-height:1.5;word-wrap:break-word;">${safeAddress}</p>
                </div>
              ` : ''}
              ${safePhone ? `
                <div style="display:flex;gap:8px;align-items:center;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a href="tel:${phoneHref}" style="margin:0;font-size:12px;color:#4b5563;text-decoration:none;">${safePhone}</a>
                </div>
              ` : ''}
              ${todayHoursStr ? `
                <div style="display:flex;gap:8px;align-items:center;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <p style="margin:0;font-size:12px;color:#4b5563;">${hoursLabel}: <strong style="color:#111827;">${todayHoursStr}</strong></p>
                </div>
              ` : ''}
            </div>
          `;

          const popup = new (trackasiagl as any).Popup({
            offset: 24,
            closeButton: false,
            className: 'ovenly-pin-popup',
            maxWidth: 'none',
          }).setHTML(popupHtml);

          new (trackasiagl as any).Marker({ element: el, anchor: 'center' })
            .setLngLat([m.longitude, m.latitude])
            .setPopup(popup)
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
