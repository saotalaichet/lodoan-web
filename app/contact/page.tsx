import { headers } from 'next/headers';
import OvenlyContactPage from './OvenlyContactPage';
import LodoanContactPage from './LodoanContactPage';

export default async function ContactPage() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  if (host.includes('ovenly.io')) return <OvenlyContactPage />;
  return <LodoanContactPage />;
}
