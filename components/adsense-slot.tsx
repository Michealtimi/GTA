"use client";
import { useEffect } from "react";

export default function AdsenseSlot() {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="my-4 flex justify-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3191981833978007"
        data-ad-slot="YOUR_SIDEBAR_SLOT_ID" // You get this from AdSense "Ads by Unit"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}