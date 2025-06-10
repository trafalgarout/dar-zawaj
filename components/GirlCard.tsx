import Image from 'next/image';
import Link from 'next/link';

interface GirlCardProps {
  id: string;
  name: string;
  image: string;
  followers: string;
}

export default function GirlCard({ id, name, image, followers }: GirlCardProps) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-md p-3 sm:p-4 flex flex-col items-center transition hover:shadow-lg w-full max-w-xs mx-auto" >
      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-3 rounded-full overflow-hidden border-4 border-pink-200">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400">لا صورة</div>
        )}
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-base sm:text-lg mb-1 font-arabic text-center text-gray-800" style={{fontFamily:'Cairo, Amiri, sans-serif'}}>{name}</div>
        <span className="bg-pink-100 px-2 py-1 rounded-full flex items-center gap-1 mt-1 text-pink-700">
          <svg width="16" height="16" fill="currentColor" className="inline"><path d="M8 14s6-3.33 6-8A6 6 0 1 0 2 6c0 4.67 6 8 6 8z"/></svg>
          {followers} ❤️
        </span>
      </div>
      <Link href={`/profile/${id}`} className="mt-2 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-base bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition font-arabic w-full text-center">
  <span className="text-white">عرض الملف الشخصي</span>
</Link>
    </div>
  );
}