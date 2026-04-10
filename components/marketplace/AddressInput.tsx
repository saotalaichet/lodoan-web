'use client';

import { useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

interface AddressInputProps {
  restaurantLat?: number | null;
  restaurantLon?: number | null;
  onAddressValidated: (isValid: boolean, address: string, coords: { lat: number; lon: number } | null) => void;
  lang?: string;
  heroMode?: boolean;
}

export default function AddressInput({
  restaurantLat = null,
  restaurantLon = null,
  onAddressValidated,
  lang = 'vi',
  heroMode = false,
}: AddressInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<{ description: string; lat: number | null; lon: number | null }[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = async (text: string) => {
    if (text.trim().length < 3) { setSuggestions([]); return; }
    setStatus('loading');
    try {
      const res = await fetch(`${RAILWAY}/api/maps/autocomplete?input=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error('autocomplete failed');
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setStatus('idle');
    } catch {
      setSuggestions([]);
      setStatus('idle');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInput(text);
    setStatus('idle');
    setErrorMsg('');
    setSuggestions([]);
    onAddressValidated(false, '', null);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchSuggestions(text), 350);
  };

  const handleHeroConfirm = () => {
    if (!input.trim()) return;
    onAddressValidated(true, input, null);
  };

  const handleSelectSuggestion = async (suggestion: { description: string; lat: number | null; lon: number | null }) => {
    setInput(suggestion.description);
    setSuggestions([]);

    // Hero mode — just accept the address for marketplace filtering, no distance check needed
    if (heroMode) {
      setStatus('idle');
      const coords = suggestion.lat && suggestion.lon ? { lat: suggestion.lat, lon: suggestion.lon } : null;
      onAddressValidated(true, suggestion.description, coords);
      return;
    }

    // Delivery modal mode — validate road distance against restaurant
    if (!restaurantLat || !restaurantLon) {
      setStatus('invalid');
      setInput('');
      setErrorMsg(lang === 'vi' ? 'Nhà hàng chưa hỗ trợ giao hàng tới địa chỉ này.' : 'Delivery not supported for this address.');
      onAddressValidated(false, '', null);
      return;
    }

    if (!suggestion.lat || !suggestion.lon) {
      setStatus('invalid');
      setInput('');
      setErrorMsg(lang === 'vi' ? 'Không thể xác định tọa độ địa chỉ này.' : 'Could not determine address coordinates.');
      onAddressValidated(false, '', null);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(`${RAILWAY}/api/maps/distance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originLat: restaurantLat,
          originLon: restaurantLon,
          destLat: suggestion.lat,
          destLon: suggestion.lon,
        }),
      });

      if (!res.ok) throw new Error('distance check failed');
      const data = await res.json();
      const roadKm = data.road_distance_km;

      if (!roadKm || roadKm > 5) {
        setStatus('invalid');
        setInput('');
        setErrorMsg(lang === 'vi' ? 'Địa chỉ quá xa, không thể giao hàng.' : 'Address too far for delivery.');
        onAddressValidated(false, '', null);
      } else {
        setStatus('valid');
        setErrorMsg('');
        onAddressValidated(true, suggestion.description, { lat: suggestion.lat, lon: suggestion.lon });
      }
    } catch {
      setStatus('invalid');
      setInput('');
      setErrorMsg(lang === 'vi' ? 'Không thể kiểm tra khoảng cách. Vui lòng thử lại.' : 'Could not check distance. Please try again.');
      onAddressValidated(false, '', null);
    }
  };

  return (
    <div className={heroMode ? '' : 'space-y-2'}>
      <div className={heroMode ? 'flex items-center gap-2' : 'relative'}>
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={e => { if (e.key === 'Enter' && heroMode) { e.preventDefault(); handleHeroConfirm(); } }}
            placeholder={lang === 'vi' ? 'Nhập địa chỉ giao hàng...' : 'Enter delivery address...'}
            className={
              heroMode
                ? 'w-full px-4 py-3.5 text-sm text-gray-900 outline-none rounded-xl border-0 focus:ring-0 bg-transparent'
                : `w-full border rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 transition-all ${
                    status === 'valid'
                      ? 'border-green-400 focus:ring-green-100'
                      : status === 'invalid'
                      ? 'border-red-400 focus:ring-red-100'
                      : 'border-gray-300 focus:border-primary/40 focus:ring-primary/10'
                  }`
            }
          />
          {status === 'loading' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 overflow-hidden">
              {suggestions.map((s, idx) => (
                <button key={idx} type="button"
                  onMouseDown={e => { e.preventDefault(); handleSelectSuggestion(s); }}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-100 last:border-0 text-sm text-gray-800 transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {s.description}
                </button>
              ))}
            </div>
          )}
        </div>

        {heroMode && (
          <button type="button" onClick={handleHeroConfirm}
            className="flex-shrink-0 bg-primary hover:opacity-90 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>

      {!heroMode && status === 'valid' && (
        <p className="text-xs text-green-600 font-medium">✅ {lang === 'vi' ? 'Địa chỉ hợp lệ — trong vùng giao hàng' : 'Address valid — within delivery range'}</p>
      )}
      {!heroMode && status === 'invalid' && errorMsg && (
        <p className="text-xs text-red-600 font-medium">⚠️ {errorMsg}</p>
      )}
    </div>
  );
}