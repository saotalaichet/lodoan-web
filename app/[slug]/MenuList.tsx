import MenuItemCard from './MenuItemCard';

interface MenuListProps {
  restaurant: any;
  categories: any[];
  items: any[];
  isMobile?: boolean;
  isClosed?: boolean;
}

/**
 * Server-rendered menu. Categories grouped, each section has data-cat
 * attribute for client-side category filtering via CSS. Items wrapped
 * in MenuItemCard (client island for cart/modal interactivity).
 *
 * Renders Vietnamese category labels by default since this is a Vietnamese
 * platform. Client may toggle to English after hydration; brief flash
 * is acceptable for SEO benefit.
 */
export default function MenuList({
  restaurant,
  categories,
  items,
  isMobile = false,
  isClosed = false,
}: MenuListProps) {
  // Group items by category
  const sortedCats = [...categories].sort(
    (a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)
  );
  const grouped = sortedCats
    .map((cat: any) => ({
      category: cat,
      catItems: items.filter((i: any) => i.category_id === cat.id),
    }))
    .filter((g) => g.catItems.length > 0);

  // Handle uncategorized items
  const categorizedIds = new Set(categories.map((c: any) => c.id));
  const uncategorized = items.filter((i: any) => !categorizedIds.has(i.category_id));
  if (uncategorized.length > 0) {
    grouped.push({
      category: { id: '__uncategorized', name: 'Khác / Other', sort_order: 9999 },
      catItems: uncategorized,
    });
  }

  if (grouped.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">Chưa có món ăn</div>
    );
  }

  // Vietnamese label (server-side default)
  const getViLabel = (name: string) => {
    if (!name) return '';
    const slash = name.indexOf('/');
    if (slash === -1) return name.trim();
    return name.substring(0, slash).trim();
  };

  return (
    <div className="space-y-8" data-menu-list>
      {grouped.map(({ category, catItems }) => (
        <section key={category.id} data-cat={category.id}>
          <div className="mb-4 pb-3 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              {getViLabel(category.name)}
            </h2>
          </div>
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {catItems.map((item: any) => (
              <div
                key={item.id}
                className={item.is_available === false ? 'opacity-50' : ''}
              >
                <MenuItemCard
                  item={item}
                  isClosed={isClosed || item.is_available === false}
                  isOutOfStock={item.is_available === false}
                  lang="vi"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
