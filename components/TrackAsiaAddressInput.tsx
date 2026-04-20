'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader2, MapPin } from 'lucide-react';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const MAX_ROAD_KM = 5;

interface Suggestion {
  label: string;
  place_id: string;
  latitude: number | null;
  longitude: number | null;
}

interface Props {
  restaurantLat?: number | null;
  restaurantLon?: number | null;
  onAddressValidated: (isValid: boolean, address: string, coords: { lat: number; lon: number } | null) => void;
  lang?: string;
  heroMode?: boolean;
  placeholder?: string;
}

export default function TrackAsiaAddressInput({
  restaurantLat,
  restaurantLon,
  onAddressValidated,
  lang = 'vi',
  heroMode = false,
  placeholder,
}: Props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultPlaceholder = placeholder ?? (lang === 'vi' ? 'Nhập địa chỉ giao hàng...' : 'Enter delivery address...');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchSuggestions = async (text: string) => {
    if (text.trim().length < 3) { setSuggestions([]); setOpen(false); return; }
    try {
      const res = await fetch(`${RAILWAY}/api/maps/autocomplete?input=${encodeURIComponent(text)}`);
      const data = await res.json();
      const list: Suggestion[] = (data.suggestions || []).filter((s: Suggestion) => s.label && s.latitude);
      setSuggestions(list);
      setOpen(list.length > 0);
    } catch { setSuggestions([]); setOpen(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInput(text); setStatus('idle'); setErrorMsg(''); setSuggestions([]);
    onAddressValidated(false, '', null);
    clearTimeout(debounceTimer.current!);
    debounceTimer.current = setTimeout(() => fetchSuggestions(text), 350);
  };

  const reject = (msg: string) => { setStatus('invalid'); setInput(''); setErrorMsg(msg); onAddressValidated(false, '', null); };

  const validateAndConfirm = async (s: Suggestion) => {
    setInput(s.label); setSuggestions([]); setOpen(false);
    if (heroMode) { onAddressValidated(true, s.label, s.latitude ? { lat: s.latitude, lon: s.longitude! } : null); return; }
    if (!restaurantLat || !restaurantLon) { reject(lang === 'vi' ? 'Nhà hàng chưa hỗ trợ giao hàng.' : 'Restaurant does not support delivery.'); return; }
    if (!s.latitude || !s.longitude) { reject(lang === 'vi' ? 'Không thể xác định tọa độ.' : 'Could not determine coordinates.'); return; }
    setStatus('loading');
    try {
      const res = await fetch(`${RAILWAY}/api/maps/distance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originLat: restaurantLat, originLon: restaurantLon, destLat: s.latitude, destLon: s.longitude }),
      });
      const data = await res.json();
      const roadKm: number | null = data.road_distance_km ?? null;
      if (roadKm === null) { reject(lang === 'vi' ? 'Không thể tính khoảng cách đường bộ. Thử địa chỉ khác.' : 'Could not calculate road distance. Try another address.'); return; }
      if (roadKm > MAX_ROAD_KM) { reject(lang === 'vi' ? `Quá xa (${roadKm.toFixed(1)} km). Chỉ giao trong ${MAX_ROAD_KM} km.` : `Too far (${roadKm.toFixed(1)} km). Max ${MAX_ROAD_KM} km.`); return; }
      setStatus('valid'); setErrorMsg(''); onAddressValidated(true, s.label, { lat: s.latitude, lon: s.longitude });
    } catch { reject(lang === 'vi' ? 'Lỗi kiểm tra khoảng cách. Thử lại.' : 'Distance check failed. Try again.'); }
  };

  const inputClass = heroMode
    ? 'w-full px-4 py-3.5 text-sm text-gray-900 outline-none rounded-xl border-0 focus:ring-0 bg-white'
    : `w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 transition-all ${status === 'valid' ? 'border-green-400 focus:ring-green-100' : status === 'invalid' ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:border-primary/40 focus:ring-primary/10'}`;

  return (
    <div className={heroMode ? '' : 'space-y-2'} ref={containerRef}>
      <div className={heroMode ? 'flex items-center gap-2' : 'relative'}>
        <div className="relative flex-1">
          <input type="text" value={input} onChange={handleChange} onFocus={() => { if (suggestions.length > 0) setOpen(true); }} onKeyDown={e => { if (e.key === 'Enter' && heroMode) { e.preventDefault(); if (input.trim()) onAddressValidated(true, input, null); } }} placeholder={defaultPlaceholder} className={inputClass} autoComplete="off" />
          {!heroMode && <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">{status === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}{status === 'valid' && <CheckCircle className="w-4 h-4 text-green-500" />}{status === 'invalid' && <AlertCircle className="w-4 h-4 text-red-500" />}</div>}
          {open && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 overflow-hidden">
              {suggestions.map((s, i) => (
                <button key={i} type="button" onMouseDown={e => { e.preventDefault(); validateAndConfirm(s); }} className="w-full text-left px-4 py-3 hover:bg-primary/5 border-b border-gray-100 last:border-0 text-sm text-gray-800 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /><span className="truncate">{s.label}</span>
                </button>
              ))}
              <div className="px-3 py-1 bg-gray-50 border-t border-gray-100"><p className="text-[10px] text-gray-400">© TrackAsia</p></div>
            </div>
          )}
        </div>
        {heroMode && (
          <button type="button" onClick={() => { if (input.trim()) onAddressValidated(true, input, null); }} className="flex-shrink-0 bg-primary hover:opacity-90 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        )}
      </div>
      {!heroMode && status === 'valid' && <p className="text-xs text-green-600 font-medium">✅ {lang === 'vi' ? 'Địa chỉ hợp lệ, trong vùng giao hàng' : 'Address valid, within delivery range'}</p>}
      {!heroMode && status === 'invalid' && errorMsg && <p className="text-xs text-red-600 font-medium">⚠️ {errorMsg}</p>}
    </div>
  );
}