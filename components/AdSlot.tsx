'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: string;
  style?: React.CSSProperties;
}

// React component that renders a Google AdSense placeholder and triggers
// the adsbygoogle push once mounted.  The slot ID should come from your
// AdSense dashboard, or you can leave it blank for auto ads (depends on
// your configuration).
export default function AdSlot({ slot, style = {} }: AdSlotProps) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (err) {
      // ignore errors; script might not be loaded yet or ads blocked
    }
  }, []);

  // Always render a visible container so developers can see where the slot will be.
  // It also helps show the placeholder on localhost / before approval.
  const placeholderStyle: React.CSSProperties = {
    border: '2px dashed rgba(255,255,255,0.5)',
    minHeight: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.9rem',
    position: 'relative',
    ...style,
  };

  return (
    <div style={placeholderStyle}>
      {/* label is always visible; real ad will replace the content when loaded */}
      <span style={{ zIndex: 1, pointerEvents: 'none' }}>
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ ...style, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        data-ad-client="ca-pub-3191981833978007"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}