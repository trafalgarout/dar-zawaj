import GirlCard from '../components/GirlCard';
import girls from '../data/girls';

const CARDS_PER_PAGE = 20;

import AdBanner from '../components/AdBanner';

export default async function Home({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1', 10);
  const startIdx = (page - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const currentGirls = girls.slice(startIdx, endIdx);
  const totalPages = Math.ceil(girls.length / CARDS_PER_PAGE);

  return (
    <div className="py-4 sm:py-8 px-2 sm:px-4 md:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-8 text-pink-700 font-arabic" style={{fontFamily:'Cairo, Amiri, sans-serif'}}>
        تعرف على فتيات للزواج
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentGirls.map((girl, i) => (
          <div key={girl.id + '-' + i} className="mb-4 sm:mb-0">
            <GirlCard {...girl} image={girl.images && girl.images[0] ? girl.images[0] : ''} />
            {((i + 1) % 4 === 0) && (
              <AdBanner key={`ad-${i}`} index={((i + 1) / 4 - 1) % 6 + 1} />
            )}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6 sm:mt-8">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <a
            key={idx}
            href={`/?page=${idx + 1}`}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border text-xs sm:text-sm font-arabic transition-colors duration-150 ${page === idx + 1 ? 'bg-pink-500 text-white' : 'bg-white text-pink-700 border-pink-200 hover:bg-pink-50'}`}
            style={{ minWidth: 32, textAlign: 'center', touchAction: 'manipulation' }}
          >
            {idx + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
