'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface EditState {
  cartLineId: string;
  qty: number;
  addons: { name: string; price: number }[];
  notes: string;
}

interface SelectedItem {
  item: any;
  groups: any[];
  edit: EditState | null;
}

interface ItemSelectionContextValue {
  selectedItem: SelectedItem | null;
  openItem: (item: any, groups: any[]) => void;
  openItemForEdit: (item: any, groups: any[], edit: EditState) => void;
  closeItem: () => void;
}

const ItemSelectionContext = createContext<ItemSelectionContextValue | null>(null);

export function ItemSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const openItem = useCallback((item: any, groups: any[]) => {
    setSelectedItem({ item, groups, edit: null });
  }, []);

  const openItemForEdit = useCallback((item: any, groups: any[], edit: EditState) => {
    setSelectedItem({ item, groups, edit });
  }, []);

  const closeItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const value = useMemo(
    () => ({ selectedItem, openItem, openItemForEdit, closeItem }),
    [selectedItem, openItem, openItemForEdit, closeItem]
  );

  return <ItemSelectionContext.Provider value={value}>{children}</ItemSelectionContext.Provider>;
}

export function useItemSelection(): ItemSelectionContextValue {
  const ctx = useContext(ItemSelectionContext);
  if (!ctx) throw new Error('useItemSelection must be used within ItemSelectionProvider');
  return ctx;
}
