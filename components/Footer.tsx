'use client';
import { useState } from 'react';
import Modal from './Modal';
import staticPages from '../data/staticPages';

export default function Footer() {
  const [modalOpen, setModalOpen] = useState<null | 'privacy' | 'terms' | 'contact'>(null);
  const modalPage = staticPages.find(p => p.key === modalOpen);
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-8 py-6 px-4 flex flex-col items-center text-center font-arabic">
      <div className="flex gap-4 mb-2">
        <button type="button" className="text-gray-500 hover:text-pink-600 underline" onClick={() => setModalOpen('privacy')}>سياسة الخصوصية</button>
        <button type="button" className="text-gray-500 hover:text-pink-600 underline" onClick={() => setModalOpen('terms')}>شروط الاستخدام</button>
        <button type="button" className="text-gray-500 hover:text-pink-600 underline" onClick={() => setModalOpen('contact')}>اتصل بنا</button>
      </div>
      <div className="flex gap-4 mb-2">
        <a href="#top" className="text-sm bg-pink-100 px-3 py-1 rounded-full hover:bg-pink-200">العودة إلى الأعلى</a>
      </div>
      <div className="flex gap-4 justify-center mb-2">
        <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="فيسبوك"><svg width="24" height="24" fill="currentColor" className="text-blue-600"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.26c-1.242 0-1.632.771-1.632 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"/></svg></a>
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="إنستغرام"><svg width="24" height="24" fill="currentColor" className="text-pink-500"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></a>
        <a href="https://t.me" target="_blank" rel="noopener" aria-label="تيليجرام"><svg width="24" height="24" fill="currentColor" className="text-blue-400"><path d="M21.05 4.572a1.5 1.5 0 0 1 1.945 1.945l-3.43 14.338c-.26 1.085-1.568 1.21-2.07.19l-3.445-7.08-3.08 2.8a1 1 0 0 1-1.63-.48l-2.1-6.3-4.06-1.32c-1.02-.33-1.01-1.8.02-2.12l19.85-6.293z"/></svg></a>
      </div>
      <div className="text-xs text-gray-400">© {new Date().getFullYear()} دار الزواج. جميع الحقوق محفوظة.</div>
      {/* Modal for static pages */}
      {modalPage && (
        <Modal open={!!modalOpen} onCloseAction={() => setModalOpen(null)} title={modalPage.title}>
          <div dangerouslySetInnerHTML={{ __html: modalPage.content.replace(/\n/g, '<br/>') }} />
        </Modal>
      )}
    </footer>
  );
}
