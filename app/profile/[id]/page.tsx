'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import girls from '../../../data/girls';
import AdBanner from '../../../components/AdBanner';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../../../lib/supabaseClient';


export default function ProfilePage({ params }: { params: { id: string } }) {
  // Get id from params
  const { id } = params;
  const girl = girls.find(g => g.id === id);

  // If no girl, bail out before any hooks
  if (!girl) return notFound();

  // Supabase persistent comments
  interface Comment {
    id: string;
    profile_id: string;
    comment: string;
    created_at: string;
  }
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pick 6 similar profiles (excluding this one)
  const similar = girls.filter(g => g.id !== girl.id).slice(0, 6);

  // Fetch comments from Supabase on mount or girl.id change
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('profile_id', girl.id)
        .order('created_at', { ascending: false });
      if (error) {
        setError('حدث خطأ أثناء جلب التعليقات');
        setComments([]);
      } else {
        setComments(data || []);
      }
      setLoading(false);
    };
    fetchComments();
  }, [girl.id]);

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setError(null);
    const { data, error } = await supabase
      .from('comments')
      .insert([{ profile_id: girl.id, comment: commentText.trim() }])
      .select();
    if (error) {
      setError('حدث خطأ أثناء إرسال التعليق');
    } else if (data && data.length > 0) {
      setComments([data[0], ...comments]);
      setCommentText('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-2 sm:px-4 font-arabic" dir="rtl">
      <AdBanner index={1} />

      {/* Basic Info & Main Image */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-center md:items-start">

      {/* Ad 1 */}
      <AdBanner index={1} />
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <Image src={girl.images[0]} alt={girl.name} width={180} height={180} className="rounded-2xl object-cover w-32 h-32 sm:w-44 sm:h-44 border-4 border-pink-200" loading="lazy" />
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">{girl.maritalStatus}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{girl.nationality}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{girl.city}</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{girl.dialect}</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{girl.hasChildren === 'نعم' ? 'لديها أطفال' : 'بدون أطفال'}</span>
          </div>
        </div>
        <div className="flex-1 space-y-2 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-pink-700 mb-2 text-center md:text-right" style={{fontFamily:'Cairo, Amiri, sans-serif'}}>{girl.fullName}</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 mb-2 justify-center md:justify-start">
            <span>العمر: {girl.age} سنة</span>
            <span>الدولة: {girl.country}</span>
            <span>عدد المتابعين: <span className="font-bold text-pink-600">{girl.followers} ❤️</span></span>
            <span>آخر ظهور: {girl.lastSeen}</span>
            <span>التقييم: <span className="text-yellow-500">{'★'.repeat(Math.round(girl.rating))}{'☆'.repeat(5 - Math.round(girl.rating))} ({girl.rating})</span></span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <svg width="16" height="16" fill="currentColor" className="inline"><path d="M8 2C4.13 2 1 5.13 1 9c0 3.87 7 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span>{girl.location}</span>
          </div>
          <div className="text-sm sm:text-base text-gray-800 mb-2 text-center md:text-right bg-pink-50 rounded p-2 border border-pink-100">{girl.shortBio}</div>
          <div className="text-gray-900 mt-2 text-xs sm:text-sm"><strong>ما تبحث عنه في شريك حياتها:</strong> <span className="block mt-1 text-gray-700">{girl.whatLookingFor}</span></div>
          {/* Marriage Types */}
          <div className="flex flex-wrap gap-2 mt-2">
            {girl.marriageTypes.map((type, idx) => (
              <span key={idx} className="bg-pink-200 text-pink-900 px-2 py-1 rounded text-xs border border-pink-300">{type}</span>
            ))}
          </div>
          {/* Hobbies */}
          <div className="flex flex-wrap gap-2 mt-2">

          {/* Ad 3 */}
          <AdBanner index={3} />
            {girl.hobbies.map((hobby, idx) => (
              <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{hobby}</span>
            ))}
          </div>
          {/* Contact Button (placeholder, requires login) */}
          <div className="mt-4">

          {/* Ad 4 */}
          <AdBanner index={4} />
            <button disabled className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg w-full text-center cursor-not-allowed">تواصل مع {girl.name} (تسجيل الدخول مطلوب)</button>
          </div>
          {/* Share Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center md:justify-start">
            <a href={`https://wa.me/?text=تعرف على ${girl.name} من دار الزواج: https://yourdomain.com/profile/${girl.id}`} target="_blank" rel="noopener" className="bg-green-100 text-green-700 px-3 py-1 rounded-lg flex items-center gap-1 text-sm">واتساب</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com/profile/${girl.id}`} target="_blank" rel="noopener" className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg flex items-center gap-1 text-sm">فيسبوك</a>
            <a href={`https://t.me/share/url?url=https://yourdomain.com/profile/${girl.id}&text=تعرف على ${girl.name} من دار الزواج`} target="_blank" rel="noopener" className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg flex items-center gap-1 text-sm">تيليجرام</a>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">

      {/* Ad 2 */}
      <AdBanner index={2} />
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-pink-700">معرض الصور</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          {girl.images && girl.images.length > 1 ? girl.images.slice(1).map((img, idx) => (
            <Image key={idx} src={img} alt={`${girl.name} صورة إضافية ${idx+1}`} width={100} height={100} className="rounded-xl object-cover w-20 h-20 sm:w-24 sm:h-24 border-2 border-pink-100" loading="lazy" />
          )) : <div className="text-gray-400 text-sm">لا توجد صور إضافية</div>}
        </div>
      </div>

      {/* Comments */}
      <div className="mb-8">

      {/* Ad 5 */}
      <AdBanner index={5} />
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-pink-700">تعليقات الزوار</h3>
        {/* Public Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-4 flex flex-col gap-2">
          <textarea
            className="w-full p-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none text-sm font-arabic"
            rows={2}
            placeholder="أضف تعليقك هنا (بدون تسجيل دخول) ..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            dir="rtl"
          />
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition w-full sm:w-auto" disabled={!commentText.trim()}>إرسال التعليق</button>
        </form>
        <div className="space-y-2">
          {loading ? (
            <div className="text-gray-400 text-sm">جاري تحميل التعليقات...</div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : comments && comments.length > 0 ? (
            comments.map((comment, idx) => (
              <div key={comment.id || idx} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" className="inline text-pink-400"><path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 1a5 5 0 1 0 0 10A5 5 0 0 0 8 3zm-2.5 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/></svg>
                <span>{comment.comment}</span>
                <span className="ml-auto text-gray-400 text-xs">{comment.created_at ? new Date(comment.created_at).toLocaleString('ar-EG') : ''}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">لا توجد تعليقات بعد</div>
          )}
        </div>
      </div>

      {/* Ad 6 */}
      <AdBanner index={6} />
      {/* Similar Profiles */}
      <div className="mt-8 sm:mt-10">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-pink-700">فتيات مشابهات</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {similar.map(s => (
            <Link key={s.id} href={`/profile/${s.id}`} className="block bg-white rounded-xl shadow p-3 text-center hover:bg-pink-50 transition">
              <Image src={s.images && s.images[0] ? s.images[0] : '/pictures/default.webp'} alt={s.name} width={80} height={80} className="rounded-full mx-auto mb-2 object-cover border-2 border-pink-200" loading="lazy" />
              <div className="font-bold text-pink-700" style={{fontFamily:'Cairo, Amiri, sans-serif'}}>{s.name}</div>
              <div className="text-xs text-gray-500">{s.country}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Legal/Ethical Warning */}
      <div className="mt-10 mb-4 text-xs text-center text-gray-500 bg-gray-50 border-t border-gray-200 pt-4 rounded-b-xl">
        <strong>تنبيه قانوني وأخلاقي:</strong> جميع الملفات المعروضة لأغراض تعارف وزواج شرعي فقط. يرجى احترام خصوصية وأخلاقيات الموقع وعدم استخدام البيانات لأي غرض آخر. الإدارة غير مسؤولة عن أي تواصل خارج المنصة.
      </div>
    </div>
  );
}

