'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Shared language hook for lodoan.vn marketplace pages.
 * Single source of truth for VI/EN language state.
 *
 * Behavior:
 * - Reads initial lang from localStorage on mount
 * - Listens for `ovenly-lang-changed` custom event (same-tab sync)
 * - Listens for `storage` event (cross-tab sync)
 * - setLang() writes localStorage AND dispatches the custom event,
 *   so all other components on the page using this hook update instantly
 *
 * Storage keys: writes both `marketplace_lang` and `ovenly_language`
 * for backwards compatibility with existing reads.
 */

type Lang = 'vi' | 'en';

const LANG_CHANGE_EVENT = 'ovenly-lang-changed';

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'vi';
  const stored =
    localStorage.getItem('marketplace_lang') ||
    localStorage.getItem('ovenly_language');
  return stored === 'en' ? 'en' : 'vi';
}

export function useMarketplaceLang() {
  const [lang, setLangState] = useState<Lang>('vi');

  useEffect(() => {
    setLangState(readStoredLang());

    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail === 'vi' || ce.detail === 'en') {
        setLangState(ce.detail);
      }
    };
    window.addEventListener(LANG_CHANGE_EVENT, onCustom);

    const onStorage = (e: StorageEvent) => {
      if (
        (e.key === 'marketplace_lang' || e.key === 'ovenly_language') &&
        (e.newValue === 'vi' || e.newValue === 'en')
      ) {
        setLangState(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, onCustom);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setLang = useCallback((next: string) => {
    if (next !== 'vi' && next !== 'en') return;
    setLangState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('marketplace_lang', next);
      localStorage.setItem('ovenly_language', next);
      window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: next }));
    }
  }, []);

  return { lang, setLang };
}
