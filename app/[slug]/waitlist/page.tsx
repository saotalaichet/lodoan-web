import { notFound } from 'next/navigation';
import { getRestaurant } from '@/lib/restaurantData';
import { WaitlistForm } from './WaitlistForm';

const RAILWAY = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://ovenly-backend-production-ce50.up.railway.app';

async function getBookingConfig(restaurantId: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/bookings/config/${restaurantId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getQueueState(restaurantId: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/bookings/queue/${restaurantId}`, { cache: 'no-store' });
    if (!res.ok) return { active_count: 0, estimated_wait_minutes: 0 };
    return res.json();
  } catch { return { active_count: 0, estimated_wait_minutes: 0 }; }
}

export default async function WaitlistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);
  if (!restaurant) notFound();

  const config = await getBookingConfig(restaurant.id);
  const enabled = config?.enable_waitlist === true;
  const queue = enabled ? await getQueueState(restaurant.id) : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto">
        <div className="bg-white sm:my-6 sm:rounded-2xl sm:shadow-sm overflow-hidden">
          {restaurant.banner && (
            <div className="w-full aspect-[16/7] bg-cover bg-center bg-slate-200"
                 style={{ backgroundImage: `url(${restaurant.banner})` }} />
          )}
          <div className="p-5">
            <div className="flex items-start gap-3 mb-5">
              {restaurant.logo ? (
                <img src={restaurant.logo} alt=""
                     className="rounded-full object-cover border-4 border-white -mt-7 shadow-sm"
                     style={{ width: 52, height: 52 }} />
              ) : (
                <div className="rounded-full -mt-7 border-4 border-white bg-slate-900"
                     style={{ width: 52, height: 52 }} />
              )}
              <div className="flex-1 pt-1">
                <h1 className="text-base font-medium text-slate-900 leading-tight">{restaurant.name}</h1>
                {restaurant.address && <p className="text-xs text-slate-500 mt-1">{restaurant.address}</p>}
              </div>
            </div>

            {!enabled ? (
              <div className="text-center py-8 text-slate-600 text-sm">
                <p>Nhà hàng hiện chưa bật danh sách chờ.</p>
                <p className="text-xs mt-2">This restaurant is not currently accepting waitlist join requests.</p>
              </div>
            ) : (
              <WaitlistForm
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
                maxPartySize={config.max_party_size}
                initialQueueCount={queue?.active_count || 0}
                initialEstimatedWait={queue?.estimated_wait_minutes || 0}
                estimatedMinutesPerParty={config.waitlist_estimated_minutes_per_party}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
