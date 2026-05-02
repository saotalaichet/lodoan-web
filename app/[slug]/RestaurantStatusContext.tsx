'use client';

import { createContext, useContext, ReactNode } from 'react';

interface RestaurantStatusContextValue {
  isClosed: boolean;
}

const RestaurantStatusContext = createContext<RestaurantStatusContextValue>({
  isClosed: false,
});

export function RestaurantStatusProvider({
  isClosed,
  children,
}: {
  isClosed: boolean;
  children: ReactNode;
}) {
  return (
    <RestaurantStatusContext.Provider value={{ isClosed }}>
      {children}
    </RestaurantStatusContext.Provider>
  );
}

export function useRestaurantClosed(): boolean {
  return useContext(RestaurantStatusContext).isClosed;
}
