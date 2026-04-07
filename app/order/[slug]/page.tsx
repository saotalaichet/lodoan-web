'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function OrderRedirectPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const slug = params.slug as string;
    if (slug && slug !== 'undefined' && slug !== 'null') {
      router.replace(`/${slug}`);
    } else {
      router.replace('/');
    }
  }, [params.slug, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}