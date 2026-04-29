'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface SelectedItem {
  item: any;
  groups: any[];
}

interface ItemSelectionContextValue {
  selectedItem: SelectedItem | null;
  openItem: (item: any, groups: any[]) => void;
  closeItem: () => void;
}

const ItemSelectionContext = createContext<ItemSelectionContextValue | null>(null);

export function ItemSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const openItem = useCallback((item: any, groups: any[]) => {
    setSelectedItem({ item, groups });
  }, []);

  const closeItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const value = useMemo(
    () => ({ selectedItem, openItem, closeItem }),
    [selectedItem, openItem, closeItem]
  );

  return <ItemSelectionContext.Provider value={value}>{children}</ItemSelectionContext.Provider>;
}

export function useItemSelection(): ItemSelectionContextValue {
  const ctx = useContext(ItemSelectionContext);
  if (!ctx) throw new Error('useItemSelection must be used within ItemSelectionProvider');
  return ctx;
}
