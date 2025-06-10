"use client";
import { ReactNode } from "react";

export default function Modal({ open, onCloseAction, title, children }: {
  open: boolean;
  onCloseAction: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-2 p-6 relative animate-fadeIn" dir="rtl">
        <button
          className="absolute top-2 left-2 text-gray-400 hover:text-pink-600 text-2xl font-bold focus:outline-none"
          onClick={onCloseAction}
          aria-label="إغلاق"
        >
          ×
        </button>
        {title && <h2 className="text-lg font-bold mb-4 text-pink-700 text-center">{title}</h2>}
        <div className="text-gray-800 text-sm max-h-[65vh] overflow-y-auto font-arabic">
          {children}
        </div>
      </div>
    </div>
  );
}
