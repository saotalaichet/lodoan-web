import { notFound } from 'next/navigation';
import { getRestaurant } from '@/lib/restaurantData';
import { ReservationForm } from './ReservationForm';

const RAILWAY = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://ovenly-backend-production-ce50.up.railway.app';

async function getBookingConfig(restaurantId: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/bookings/config/${restaurantId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default async function ReservationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);
  if (!restaurant) notFound();

  const config = await getBookingConfig(restaurant.id);
  const enabled = config?.enable_reservations === true;

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
                <div className="rounded-full bg-blue-600 -mt-7 border-4 border-white"
                     style={{ width: 52, height: 52 }} />
              )}
              <div className="flex-1 pt-1">
                <h1 className="text-base font-medium text-slate-900 leading-tight">{restaurant.name}</h1>
                {restaurant.address && <p className="text-xs text-slate-500 mt-1">{restaurant.address}</p>}
              </div>
            </div>

            {!enabled ? (
              <div className="text-center py-8 text-slate-600 text-sm">
                <p>Nhà hàng hiện chưa nhận đặt bàn.</p>
                <p className="text-xs mt-2">This restaurant is not currently accepting reservations.</p>
              </div>
            ) : (
              <ReservationForm
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
                maxPartySize={config.max_party_size}
                advanceWindowDays={config.advance_booking_window_days}
              />
            )}
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 py-4">
          Powered by <span className="font-medium text-blue-600">Ovenly</span>
        </p>
      </div>
    </div>
  );
}
