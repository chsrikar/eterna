export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cream-dark/20 overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-cream" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-cream rounded-full w-1/3" />
        <div className="h-4 bg-cream rounded-full w-3/4" />
        <div className="h-4 bg-cream rounded-full w-1/2" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="w-3 h-3 bg-cream rounded-full" />
          ))}
        </div>
        <div className="h-5 bg-cream rounded-full w-1/4" />
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
      <div className="h-8 bg-cream rounded-full w-1/3 mb-4" />
      <div className="h-4 bg-cream rounded-full w-2/3 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
