'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const PRIMARY = '#8B1A1A';

const CUISINE_OPTIONS = [
  { key: 'Vietnamese', vi: 'Việt Nam', en: 'Vietnamese' },
  { key: 'Chinese', vi: 'Trung Quốc', en: 'Chinese' },
  { key: 'Indian', vi: 'Ấn Độ', en: 'Indian' },
  { key: 'FriedChicken', vi: 'Gà Rán', en: 'Fried Chicken' },
  { key: 'Snacks', vi: 'Đồ ăn nhẹ', en: 'Snacks' },
  { key: 'FastFood', vi: 'Thức ăn nhanh', en: 'Fast Food' },
  { key: 'Pizza', vi: 'Pizza', en: 'Pizza' },
  { key: 'BubbleTea', vi: 'Trà Sữa', en: 'Bubble Tea' },
  { key: 'Noodles', vi: 'Mì', en: 'Noodles' },
  { key: 'Seafood', vi: 'Hải Sản', en: 'Seafood' },
  { key: 'Hotpot', vi: 'Lẩu', en: 'Hotpot' },
  { key: 'Banhmi', vi: 'Bánh Mì', en: 'Banh Mi' },
  { key: 'Rice', vi: 'Cơm', en: 'Rice' },
  { key: 'Vegetarian', vi: 'Chay', en: 'Vegetarian' },
  { key: 'BBQ', vi: 'BBQ', en: 'BBQ' },
  { key: 'Japanese', vi: 'Nhật Bản', en: 'Japanese' },
  { key: 'Korean', vi: 'Hàn Quốc', en: 'Korean' },
  { key: 'Thai', vi: 'Thái Lan', en: 'Thai' },
  { key: 'Italian', vi: 'Ý', en: 'Italian' },
  { key: 'American', vi: 'Mỹ', en: 'American' },
  { key: 'Cafe', vi: 'Cà Phê', en: 'Cafe' },
  { key: 'Dessert', vi: 'Tráng Miệng', en: 'Dessert' },
  { key: 'Fusion', vi: 'Fusion', en: 'Fusion' },
  { key: 'Other', vi: 'Khác', en: 'Other' },
];

const CITY_OPTIONS = [
  { key: 'HoChiMinh', vi: 'TP. HCM', en: 'Ho Chi Minh City' },
  { key: 'HaNoi', vi: 'Hà Nội', en: 'Hanoi' },
  { key: 'DaNang', vi: 'Đà Nẵng', en: 'Da Nang' },
  { key: 'Hue', vi: 'Huế', en: 'Hue' },
  { key: 'CanTho', vi: 'Cần Thơ', en: 'Can Tho' },
  { key: 'NhaTrang', vi: 'Nha Trang', en: 'Nha Trang' },
  { key: 'DaLat', vi: 'Đà Lạt', en: 'Da Lat' },
  { key: 'VungTau', vi: 'Vũng Tàu', en: 'Vung Tau' },
  { key: 'HaiPhong', vi: 'Hải Phòng', en: 'Hai Phong' },
  { key: 'BienHoa', vi: 'Biên Hòa', en: 'Bien Hoa' },
];

const DIETARY_OPTIONS = [
  { key: 'Vegetarian Friendly', vi: 'Chay', en: 'Vegetarian' },
  { key: 'Vegan', vi: 'Thuần Chay', en: 'Vegan' },
  { key: 'Gluten Free', vi: 'Không Gluten', en: 'Gluten Free' },
  { key: 'Halal', vi: 'Halal', en: 'Halal' },
  { key: 'Nut Free', vi: 'Không Hạt', en: 'Nut Free' },
  { key: 'Dairy Free', vi: 'Không Dairy', en: 'Dairy Free' },
  { key: 'Seafood Free', vi: 'Không Hải Sản', en: 'Seafood Free' },
];

const BASE_BTN = 'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all select-none whitespace-nowrap';
const activeStyle = { border: `1px solid ${PRIMARY}`, color: PRIMARY, background: '#fff' };
const inactiveStyle = { border: '1px solid #E0E0E0', color: '#333333', background: '#fff' };

function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

interface FilterBarProps {
  lang: string;
  nearMe: boolean;
  onToggleNearMe: () => void;
  selectedCuisines: string[];
  onToggleCuisine: (key: string) => void;
  selectedDietary: string[];
  onToggleDietary: (key: string) => void;
  onClearAll: () => void;
  selectedCity: string | null;
  onCityChange: (city: string | null) => void;
}

export default function FilterBar({
  lang, nearMe, onToggleNearMe,
  selectedCuisines, onToggleCuisine,
  selectedDietary, onToggleDietary,
  onClearAll, selectedCity, onCityChange,
}: FilterBarProps) {
  const [cuisineOpen, setCuisineOpen] = useState(false);
  const [dietaryOpen, setDietaryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const cuisineRef = useRef<HTMLDivElement>(null);
  const dietaryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useClickOutside(cuisineRef, () => setCuisineOpen(false));
  useClickOutside(dietaryRef, () => setDietaryOpen(false));
  useClickOutside(cityRef, () => setCityOpen(false));

  const cuisineActive = selectedCuisines.length > 0;
  const dietaryActive = selectedDietary.length > 0;
  const cityActive = !!selectedCity;
  const anyActive = nearMe || cuisineActive || dietaryActive || cityActive;

  const pillStyle = (active: boolean) => active
    ? { background: PRIMARY, color: 'white', border: `1px solid ${PRIMARY}` }
    : { background: '#F7F7F7', color: '#444', border: '1px solid #E8E8E8' };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 flex-wrap">

        {/* Near Me */}
        <button onClick={onToggleNearMe} className={BASE_BTN} style={nearMe ? activeStyle : inactiveStyle}>
          <span>📍</span>
          {lang === 'vi' ? 'Gần Tôi' : 'Near Me'}
        </button>

        {/* City */}
        <div className="relative" ref={cityRef}>
          <button
            onClick={() => { setCityOpen(o => !o); setCuisineOpen(false); setDietaryOpen(false); }}
            className={BASE_BTN} style={cityActive ? activeStyle : inactiveStyle}
          >
            <span>🏙️</span>
            {lang === 'vi' ? 'Thành Phố' : 'City'}
            {cityActive && (
              <span className="ml-0.5 text-xs font-bold">
                ({CITY_OPTIONS.find(c => c.key === selectedCity)?.[lang === 'vi' ? 'vi' : 'en']})
              </span>
            )}
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200"
              style={{ transform: cityOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
          {cityOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl p-4"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid #F0F0F0', minWidth: '280px' }}>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { onCityChange(null); setCityOpen(false); }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={!selectedCity ? { background: PRIMARY, color: 'white', border: `1px solid ${PRIMARY}` } : { background: '#F7F7F7', color: '#444', border: '1px solid #E8E8E8' }}>
                  {lang === 'vi' ? 'Tất cả' : 'All'}
                </button>
                {CITY_OPTIONS.map(city => (
                  <button key={city.key}
                    onClick={() => { onCityChange(selectedCity === city.key ? null : city.key); setCityOpen(false); }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={pillStyle(selectedCity === city.key)}>
                    {lang === 'vi' ? city.vi : city.en}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cuisine */}
        <div className="relative" ref={cuisineRef}>
          <button
            onClick={() => { setCuisineOpen(o => !o); setDietaryOpen(false); setCityOpen(false); }}
            className={BASE_BTN} style={cuisineActive ? activeStyle : inactiveStyle}
          >
            <span>🍽️</span>
            {lang === 'vi' ? 'Ẩm Thực' : 'Cuisine'}
            {cuisineActive && <span className="ml-0.5 text-xs font-bold">({selectedCuisines.length})</span>}
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200"
              style={{ transform: cuisineOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
          {cuisineOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl p-4"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid #F0F0F0', minWidth: '340px' }}>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {CUISINE_OPTIONS.map(opt => (
                  <button key={opt.key} onClick={() => onToggleCuisine(opt.key)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all text-center"
                    style={pillStyle(selectedCuisines.includes(opt.key))}>
                    {lang === 'vi' ? opt.vi : opt.en}
                  </button>
                ))}
              </div>
              {cuisineActive && (
                <button onClick={() => selectedCuisines.forEach(c => onToggleCuisine(c))}
                  className="w-full text-xs font-semibold text-center py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                  {lang === 'vi' ? 'Xóa lựa chọn' : 'Clear selection'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dietary */}
        <div className="relative" ref={dietaryRef}>
          <button
            onClick={() => { setDietaryOpen(o => !o); setCuisineOpen(false); setCityOpen(false); }}
            className={BASE_BTN} style={dietaryActive ? activeStyle : inactiveStyle}
          >
            <span>🥗</span>
            {lang === 'vi' ? 'Ăn Kiêng' : 'Dietary'}
            {dietaryActive && <span className="ml-0.5 text-xs font-bold">({selectedDietary.length})</span>}
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200"
              style={{ transform: dietaryOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
          {dietaryOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl p-4"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.10)', border: '1px solid #F0F0F0', minWidth: '280px' }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {DIETARY_OPTIONS.map(opt => (
                  <button key={opt.key} onClick={() => onToggleDietary(opt.key)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={pillStyle(selectedDietary.includes(opt.key))}>
                    {lang === 'vi' ? opt.vi : opt.en}
                  </button>
                ))}
              </div>
              {dietaryActive && (
                <button onClick={() => selectedDietary.forEach(d => onToggleDietary(d))}
                  className="w-full text-xs font-semibold text-center py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                  {lang === 'vi' ? 'Xóa lựa chọn' : 'Clear selection'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Clear all */}
        {anyActive && (
          <button onClick={onClearAll} className={BASE_BTN} style={inactiveStyle}>
            <X className="w-3.5 h-3.5" />
            {lang === 'vi' ? 'Xóa Bộ Lọc' : 'Clear All'}
          </button>
        )}
      </div>

      <div className="mt-4 border-t border-gray-200" />

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}