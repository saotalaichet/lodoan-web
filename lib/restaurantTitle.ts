/**
 * Helpers for generating SEO-friendly Vietnamese titles for restaurant pages.
 * Mirrors ChowNow's title pattern (action verb + brand + cuisine + city) but
 * adapted for Vietnamese language conventions.
 *
 * Key insight: Vietnamese uses different words for different venue types.
 * "Nhà hàng" (restaurant) only fits sit-down meal places. Bubble tea, coffee,
 * dessert shops use "Quán". Bakeries use "Tiệm".
 */

// English cuisine code → Vietnamese cuisine name
const CUISINE_VI: Record<string, string> = {
  japanese: 'Nhật Bản',
  chinese: 'Trung Hoa',
  korean: 'Hàn Quốc',
  thai: 'Thái Lan',
  italian: 'Ý',
  french: 'Pháp',
  american: 'Mỹ',
  mexican: 'Mexico',
  indian: 'Ấn Độ',
  vietnamese: 'Việt Nam',
  bubbletea: 'Trà Sữa',
  coffee: 'Cà Phê',
  cafe: 'Cà Phê',
  dessert: 'Tráng Miệng',
  bakery: 'Bánh',
  pizza: 'Pizza',
  fastfood: 'Đồ Ăn Nhanh',
  streetfood: 'Ăn Vặt',
  seafood: 'Hải Sản',
  bbq: 'Nướng',
  hotpot: 'Lẩu',
  noodles: 'Mì',
  rice: 'Cơm',
  sandwich: 'Bánh Mì',
  smoothie: 'Sinh Tố',
  juice: 'Nước Ép',
  breakfast: 'Bữa Sáng',
  lunch: 'Trưa',
  vegan: 'Chay',
  vegetarian: 'Chay',
};

// Cuisine → venue word in Vietnamese
// Default is 'Nhà hàng' (proper restaurant)
// Bubble tea, coffee, dessert use 'Quán' (casual shop)
// Bakery uses 'Tiệm' (specialty shop)
const CUISINE_VENUE: Record<string, string> = {
  bubbletea: 'Quán',
  coffee: 'Quán',
  cafe: 'Quán',
  dessert: 'Quán',
  bakery: 'Tiệm',
  smoothie: 'Quán',
  juice: 'Quán',
  sandwich: 'Tiệm',
  streetfood: 'Quán',
  fastfood: 'Quán',
  // All others default to 'Nhà hàng'
};

// English city slug → Vietnamese city name with proper diacritics
const CITY_VI: Record<string, string> = {
  hochiminh: 'Hồ Chí Minh',
  'ho chi minh': 'Hồ Chí Minh',
  saigon: 'Hồ Chí Minh',
  'sai gon': 'Hồ Chí Minh',
  hanoi: 'Hà Nội',
  'ha noi': 'Hà Nội',
  danang: 'Đà Nẵng',
  'da nang': 'Đà Nẵng',
  cantho: 'Cần Thơ',
  'can tho': 'Cần Thơ',
  haiphong: 'Hải Phòng',
  'hai phong': 'Hải Phòng',
  nhatrang: 'Nha Trang',
  'nha trang': 'Nha Trang',
  hue: 'Huế',
  dalat: 'Đà Lạt',
  'da lat': 'Đà Lạt',
  vungtau: 'Vũng Tàu',
  'vung tau': 'Vũng Tàu',
};

/**
 * Translate a cuisine code to its Vietnamese display name.
 * Falls back to the original input (lowercased then capitalized) if not in map.
 */
export function cuisineToVietnamese(cuisine: string): string {
  if (!cuisine) return '';
  const key = cuisine.toLowerCase().trim();
  return CUISINE_VI[key] || cuisine;
}

/**
 * Get the Vietnamese venue word ('Nhà hàng', 'Quán', 'Tiệm') for a cuisine.
 * Defaults to 'Nhà hàng' for any unmapped cuisine (safest default for full-meal places).
 */
export function venueForCuisine(cuisine: string): string {
  if (!cuisine) return 'Nhà hàng';
  const key = cuisine.toLowerCase().trim();
  return CUISINE_VENUE[key] || 'Nhà hàng';
}

/**
 * Pick the most appropriate cuisine string from a restaurant for use in title.
 * Priority:
 *   1. cuisine_type_vietnamese if it's a real Vietnamese cuisine name (not "Việt Nam"
 *      misused as a translation marker — too generic)
 *   2. First entry from cuisine_type array, translated via map
 *   3. cuisine_type if it's a string (some old records), translated via map
 *   4. Empty string (omit cuisine from title)
 */
export function pickCuisineForTitle(restaurant: any): string {
  // Use cuisine_type_vietnamese if set, but only if it's not the generic 'Việt Nam'
  // when the actual cuisine_type tells a different story (e.g., Japanese place
  // with cuisine_type_vietnamese set to 'Việt Nam' by mistake).
  const vnSet = restaurant?.cuisine_type_vietnamese;
  const englishCuisines = Array.isArray(restaurant?.cuisine_type)
    ? restaurant.cuisine_type
    : (restaurant?.cuisine_type ? [restaurant.cuisine_type] : []);
  const firstEnglish = englishCuisines[0] || '';

  // If the cuisine_type_vietnamese contradicts the English cuisine_type
  // (e.g., 'Việt Nam' set on a Japanese place), prefer the English-derived translation.
  if (vnSet && firstEnglish) {
    const derivedVn = cuisineToVietnamese(firstEnglish);
    if (derivedVn && derivedVn !== vnSet && vnSet === 'Việt Nam') {
      return derivedVn;
    }
  }

  if (vnSet) return vnSet;
  if (firstEnglish) return cuisineToVietnamese(firstEnglish);
  return '';
}

/**
 * Get the first English cuisine code (for venue-word lookup).
 * Even if we end up displaying the Vietnamese name, we need the English code
 * to determine venue word.
 */
export function pickCuisineCode(restaurant: any): string {
  const list = Array.isArray(restaurant?.cuisine_type)
    ? restaurant.cuisine_type
    : (restaurant?.cuisine_type ? [restaurant.cuisine_type] : []);
  return list[0] || '';
}

/**
 * Normalize a restaurant's city to a properly diacritized Vietnamese name.
 * If `city` is null, parse it out of `address`.
 * Returns empty string if no city can be determined.
 */
export function normalizeCity(restaurant: any): string {
  const raw = restaurant?.city;

  if (raw && typeof raw === 'string' && raw.trim()) {
    const key = raw.toLowerCase().replace(/[^a-z]/g, '');
    if (CITY_VI[key]) return CITY_VI[key];
    // If the value already has diacritics or doesn't match map, return as-is trimmed
    return raw.trim();
  }

  // Fallback: try to parse from address.
  const address = restaurant?.address;
  if (typeof address === 'string') {
    // Look for known city names in the address (with or without diacritics)
    const lower = address.toLowerCase();
    for (const [key, vn] of Object.entries(CITY_VI)) {
      // Skip multi-word keys for the simple includes check; check single-word forms
      if (key.includes(' ')) continue;
      if (lower.replace(/[^a-z]/g, '').includes(key)) {
        return vn;
      }
    }
    // Also check for diacritized forms in the address itself
    const knownDiacritized = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Nha Trang', 'Huế', 'Đà Lạt', 'Vũng Tàu'];
    for (const city of knownDiacritized) {
      if (address.includes(city)) return city;
    }
  }

  return '';
}

/**
 * Build the page <title> for a restaurant ordering page, ChowNow-style.
 * Pattern: `Đặt món [Name] online | [Venue] [Cuisine] tại [City]`
 *
 * Examples:
 *   - Sushi Demo Store → "Đặt món Sushi Demo Store online | Nhà hàng Nhật Bản tại Hồ Chí Minh"
 *   - Bubble Tea Demo → "Đặt món Bubble Tea Demo online | Quán Trà Sữa tại Hồ Chí Minh"
 *   - NYMS Tea & Coffee → "Đặt món NYMS Tea & Coffee online | Quán Trà Sữa tại Hồ Chí Minh"
 *
 * Falls back gracefully when fields are missing — the title remains valid Vietnamese.
 */
export function buildRestaurantTitle(restaurant: any): string {
  const name = restaurant?.name || '';
  const cuisineCode = pickCuisineCode(restaurant);
  const cuisineVn = pickCuisineForTitle(restaurant);
  const venue = venueForCuisine(cuisineCode);
  const city = normalizeCity(restaurant);

  const head = name ? `Đặt món ${name} online` : 'Đặt món online';

  const tailParts = [];
  if (cuisineVn) tailParts.push(`${venue} ${cuisineVn}`);
  if (city) tailParts.push(`tại ${city}`);
  const tail = tailParts.join(' ');

  return tail ? `${head} | ${tail}` : head;
}

/**
 * Build the meta description, also white-label, also Vietnamese-friendly.
 * Uses the restaurant's own description if present; otherwise generates one.
 */
export function buildRestaurantDescription(restaurant: any): string {
  if (restaurant?.description && typeof restaurant.description === 'string') {
    const desc = restaurant.description.trim();
    if (desc.length > 0) {
      return desc.length > 155 ? `${desc.slice(0, 155)}...` : desc;
    }
  }

  const name = restaurant?.name || '';
  const city = normalizeCity(restaurant);
  const cityPart = city ? ` tại ${city}` : '';

  return `Đặt món ${name} online${cityPart}. Giao hàng tận nơi hoặc mang về. Đặt nhanh và tiện lợi.`;
}
