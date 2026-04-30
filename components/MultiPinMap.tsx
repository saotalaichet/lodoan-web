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
          const statusBg = isOpen ? '#ecfdf5' : '#fef2f2';
          const statusBorder = isOpen ? '#a7f3d0' : '#fecaca';
          const statusText = isOpen ? '#047857' : '#b91c1c';
          const statusDot = isOpen ? '#10b981' : '#ef4444';
          const statusLabel = isOpen
            ? (lang === 'en' ? 'Open now' : 'Đang mở')
            : (lang === 'en' ? 'Closed' : 'Đã đóng');
          const ctaLabel = lang === 'en' ? 'Order from here' : 'Đặt món tại đây';
          const youAreHereLabel = lang === 'en' ? 'You are here' : 'Bạn đang ở đây';

          const popupHtml = `
            <div style="display:flex;flex-direction:column;gap:10px;padding:14px;min-width:240px;font-family:system-ui,-apple-system,sans-serif;">
              <div style="display:flex;gap:10px;align-items:flex-start;">
                ${safeLogo
                  ? `<img src="${safeLogo}" alt="" style="width:44px;height:44px;border-radius:10px;object-fit:contain;background:#f9fafb;border:1px solid #f3f4f6;flex-shrink:0;" />`
                  : `<div style="width:44px;height:44px;border-radius:10px;background:#f3f4f6;flex-shrink:0;"></div>`
                }
                <div style="flex:1;min-width:0;">
                  <p style="margin:0 0 6px 0;font-weight:700;font-size:14px;color:#111827;line-height:1.3;">${safeName}</p>
                  <span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;padding:2px 8px;border-radius:9999px;background:${statusBg};color:${statusText};border:1px solid ${statusBorder};">
                    <span style="width:6px;height:6px;border-radius:50%;background:${statusDot};display:inline-block;"></span>
                    ${statusLabel}
                  </span>
                </div>
              </div>
              ${m.isCurrent
                ? `<div style="background:${primaryColor};color:#fff;text-align:center;padding:8px 12px;border-radius:10px;font-weight:700;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;">${youAreHereLabel}</div>`
                : `<a href="/${m.slug}" style="display:flex;align-items:center;justify-content:center;gap:6px;background:${primaryColor};color:#fff;text-decoration:none;padding:9px 12px;border-radius:10px;font-weight:600;font-size:13px;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">${ctaLabel} <span style="font-size:14px;">→</span></a>`
              }
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
