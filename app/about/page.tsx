'use client';

import { useEffect, useState } from 'react';
import OvenlyAboutPage from './OvenlyAboutPage';
import LodoanAboutPage from './LodoanAboutPage';

export default function AboutPage() {
  const [isOvenly, setIsOvenly] = useState(false);

  useEffect(() => {
    setIsOvenly(window.location.hostname.includes('ovenly.io'));
  }, []);

  return isOvenly ? <OvenlyAboutPage /> : <LodoanAboutPage />;
}