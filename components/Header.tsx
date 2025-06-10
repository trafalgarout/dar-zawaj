"use client";
import { useState } from 'react';
import Modal from './Modal';
import staticPages from '../data/staticPages';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<null | 'privacy' | 'terms' | 'contact'>(null);
  const modalPage = staticPages.find(p => p.key === modalOpen);

  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 flex items-center justify-between border-b border-gray-100 relative z-30">
      <div className="flex items-center gap-2">
        <div className="font-bold text-xl text-primary" style={{fontFamily:'Cairo, Amiri, sans-serif'}}>دار الزواج</div>
      </div>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-4 text-base font-arabic">
        <Link href="/">الصفحة الرئيسية</Link>
        <Link href="/girls">تعرف على فتيات</Link>
        <span className="text-gray-400 cursor-not-allowed select-none" aria-disabled="true" tabIndex={-1}>تسجيل حساب</span>
        <Link href="/articles">مقالات</Link>
        <button type="button" className="text-pink-700 hover:text-accent focus:outline-none underline" onClick={() => setModalOpen('privacy')}>سياسة الخصوصية</button>
        <button type="button" className="text-pink-700 hover:text-accent focus:outline-none underline" onClick={() => setModalOpen('terms')}>شروط الاستخدام</button>
        <button type="button" className="text-pink-700 hover:text-accent focus:outline-none underline" onClick={() => setModalOpen('contact')}>اتصل بنا</button>
      </nav>
      {/* Mobile hamburger */}
      <button
        className="md:hidden text-3xl text-pink-600 focus:outline-none rtl:ml-2 ltr:mr-2"
        aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>
      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden absolute top-full right-0 w-56 bg-white shadow-lg rounded-b-xl py-4 px-6 flex flex-col gap-4 text-base font-arabic animate-fadeIn rtl:right-0 ltr:left-0"
          style={{fontFamily:'Cairo, Amiri, sans-serif'}}
        >
          <Link href="/" onClick={() => setMenuOpen(false)}>الصفحة الرئيسية</Link>
          <Link href="/girls" onClick={() => setMenuOpen(false)}>تعرف على فتيات</Link>
          <span className="text-gray-400 cursor-not-allowed select-none" aria-disabled="true" tabIndex={-1}>تسجيل حساب</span>
          <Link href="/articles" onClick={() => setMenuOpen(false)}>مقالات</Link>
          <button type="button" className="text-pink-700 hover:text-accent focus:outline-none underline text-right" onClick={() => { setModalOpen('privacy'); setMenuOpen(false); }}>سياسة الخصوصية</button>
          <button type="button" className="text-pink-700 hover:text-accent focus:outline-none underline text-right" onClick={() => { setModalOpen('terms'); setMenuOpen(false); }}>شروط الاستخدام</button>
          <button type="button" className="text-pink-700 hover:text-accent focus:outline-none underline text-right" onClick={() => { setModalOpen('contact'); setMenuOpen(false); }}>اتصل بنا</button>
        </nav>
      )}
      {/* Modal for static pages */}
      {modalPage && (
        <Modal open={!!modalOpen} onCloseAction={() => setModalOpen(null)} title={modalPage.title}>
          <div dangerouslySetInnerHTML={{ __html: modalPage.content.replace(/\n/g, '<br/>') }} />
        </Modal>
      )}
    </header>
  );
}
