'use client';

import { useEffect, useState } from 'react';
import OvenlyContactPage from './OvenlyContactPage';
import LodoanContactPage from './LodoanContactPage';

export default function ContactPage() {
  const [isOvenly, setIsOvenly] = useState(false);

  useEffect(() => {
    setIsOvenly(window.location.hostname.includes('ovenly.io'));
  }, []);

  return isOvenly ? <OvenlyContactPage /> : <LodoanContactPage />;
}