import { getRestaurants, Restaurant } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

const PRIMARY = '#8B1A1A';

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const isOpen = restaurant.is_open && restaurant.is_accepting_orders;

  return (
    <Link href={`/${restaurant.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
        {/* Banner */}
        <div className="relative h-44 bg-gray-100">
          {restaurant.banner ? (
            <Image
              src={restaurant.banner}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900 to-red-700">
              <span className="text-white text-4xl">🍜</span>
            </div>
          )}
          {/* Open/Closed badge */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
            isOpen
              ? 'bg-green-500 text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {isOpen ? '● Đang mở' : '● Đóng cửa'}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Logo */}
            {restaurant.logo && (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                <Image
                  src={restaurant.logo}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base truncate">
                {restaurant.name}
              </h3>
              {restaurant.cuisine_type && (
                <p className="text-sm text-gray-500 mt-0.5">{restaurant.cuisine_type}</p>
              )}
              {restaurant.address && (
                <p className="text-xs text-gray-400 mt-1 truncate">
                  📍 {restaurant.address}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
            {restaurant.rating && (
              <span className="text-sm text-gray-600">
                ⭐ {restaurant.rating.toFixed(1)}
                {restaurant.total_reviews && (
                  <span className="text-gray-400 ml-1">({restaurant.total_reviews})</span>
                )}
              </span>
            )}
            {restaurant.delivery_fee !== undefined && (
              <span className="text-sm text-gray-600">
                🛵 {restaurant.delivery_fee === 0
                  ? 'Miễn phí giao hàng'
                  : `${new Intl.NumberFormat('vi-VN').format(restaurant.delivery_fee)}đ`
                }
              </span>
            )}
            {restaurant.min_order_amount && (
              <span className="text-sm text-gray-400">
                Min: {new Intl.NumberFormat('vi-VN').format(restaurant.min_order_amount)}đ
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F0' }}>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-xl" style={{ color: PRIMARY }}>
              LÒ ĐỒ ĂN
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/signup"
              className="text-sm font-bold text-white px-4 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ textAlign: 'center' }} className="py-16 px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Đặt món yêu thích<br />
          <span style={{ color: PRIMARY }}>giao tận nơi</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          Khám phá các nhà hàng tốt nhất và đặt món trực tuyến dễ dàng
        </p>
      </section>

      {/* Restaurant grid */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        {restaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍜</p>
            <p className="text-gray-500 text-lg">Chưa có nhà hàng nào</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {restaurants.length} nhà hàng
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-black text-lg mb-1" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</p>
          <p className="text-sm text-gray-400">Powered by Ovenly · ovenly.io</p>
        </div>
      </footer>

    </div>
  );
}