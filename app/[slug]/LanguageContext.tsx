'use client';

import { createContext, useContext, ReactNode } from 'react';

interface LanguageContextValue {
  lang: string;
}

const LanguageContext = createContext<LanguageContextValue>({ lang: 'vi' });

export function LanguageProvider({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): string {
  return useContext(LanguageContext).lang;
}
