"use client";

import { useEffect } from "react";
import Script from "next/script";

const adConfigs = [
  { slot: "7352451765", label: "AI ADS 1" },
  { slot: "8056009400", label: "AI ADS 2" },
  { slot: "3281344818", label: "AI ADS 3" },
  { slot: "4240646223", label: "AI ADS 4" },
  { slot: "2927564558", label: "AI ADS 5" },
  { slot: "8342099801", label: "AI ADS 6" },
];

export default function AdBanner({ index = 1 }: { index?: number }) {
  const config = adConfigs[(index - 1) % adConfigs.length];
  useEffect(() => {
    // Only push if adsbygoogle is available (client-side)
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (e) {}
    }
  }, [index]);

  return (
    <div className="my-6 flex justify-center">
      {/* Only load the AdSense script once on the page (idempotent) */}
      {index === 1 && (
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6865939387108271"
          crossOrigin="anonymous"
        />
      )}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <span className="sr-only">{config.label}</span>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6865939387108271"
          data-ad-slot={config.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          key={config.slot}
        ></ins>
      </div>
    </div>
  );
}
