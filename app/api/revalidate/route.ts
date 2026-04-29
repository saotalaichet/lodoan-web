import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const auth = request.headers.get('authorization');
  const secret = auth?.replace('Bearer ', '');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  try {
    revalidateTag(`restaurant:${slug}`, { expire: 0 });
    console.log(`[REVALIDATE] Tag restaurant:${slug} invalidated at ${new Date().toISOString()}`);
    return NextResponse.json({ revalidated: true, slug, tag: `restaurant:${slug}`, timestamp: Date.now() });
  } catch (err: any) {
    console.error('[REVALIDATE] Failed:', err?.message);
    return NextResponse.json({ error: 'Revalidate failed', message: err?.message }, { status: 500 });
  }
}
