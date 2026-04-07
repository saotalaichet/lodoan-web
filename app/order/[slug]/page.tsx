import { redirect } from 'next/navigation';

export default function OrderSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/${params.slug}`);
}