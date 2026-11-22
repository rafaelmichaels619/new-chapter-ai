/**
 * Gild public settings. This file is the one place to edit them.
 *
 * SITE BASE
 * ---------
 * No trailing slash. The pages repeat this string in canonical, Open
 * Graph, Twitter, and JSON-LD tags for crawlers that do not run
 * JavaScript. site.js also copies siteBase into those tags in the browser.
 *
 * Today:  https://newchapteraistudio.com/gild
 * Later:  https://gildtravel.com
 *
 * When the site moves, change siteBase and replace the same prefix
 * in index.html, privacy.html, and terms.html.
 *
 * STORE LISTINGS
 * --------------
 * Gild is not on the App Store or Google Play yet.
 * The badges read "Coming soon" while comingSoon is true.
 *
 * When both listings are published:
 *   1. Replace appStoreUrl with the live App Store URL.
 *   2. Replace playStoreUrl with the live Google Play URL.
 *   3. Set comingSoon to false.
 *
 * Placeholder URLs are ignored even if comingSoon is false.
 * Do not put secrets in this file. It is public.
 */
window.GILD_CONFIG = {
  siteBase: "https://newchapteraistudio.com/gild",
  comingSoon: true,
  appStoreUrl: "https://apps.apple.com/app/gild/id0000000000",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.example.gild"
};
