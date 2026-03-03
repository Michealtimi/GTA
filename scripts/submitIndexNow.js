#!/usr/bin/env node

// simple Node script to send all static URLs (and optionally dynamic ones) to
// IndexNow. It reads INDEXNOW_KEY and BASE_URL from environment.

const { notifyUrls } = require('../lib/indexNow');

(async () => {
  const key = process.env.INDEXNOW_KEY;
  const base = process.env.BASE_URL || 'https://gta.logik.website';
  if (!key) {
    console.error('INDEXNOW_KEY not set');
    process.exit(1);
  }

  const urls = [
    base,
    `${base}/pc-audit`,
    `${base}/map`,
    `${base}/garage`,
    `${base}/privacy`,
  ];

  try {
    const status = await notifyUrls(urls, key, new URL(base).host);
    console.log('IndexNow submitted, status', status);
  } catch (err) {
    console.error('IndexNow submission error', err);
    process.exit(1);
  }
})();
