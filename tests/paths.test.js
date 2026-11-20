const assert = require("assert");
const { parseMedia, normalizePath, endpointReady, emailReady } = require("../js/main.js");

assert.deepStrictEqual(parseMedia(""), { type: "empty" });
assert.deepStrictEqual(parseMedia("   "), { type: "empty" });

assert.deepStrictEqual(parseMedia("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), {
  type: "youtube",
  id: "dQw4w9WgXcQ"
});
assert.strictEqual(parseMedia("https://youtu.be/dQw4w9WgXcQ").type, "youtube");
assert.strictEqual(parseMedia("https://www.youtube.com/shorts/abcdefghijk").id, "abcdefghijk");
assert.strictEqual(parseMedia("https://www.youtube.com/embed/abcdefghijk").id, "abcdefghijk");
assert.strictEqual(parseMedia("https://www.youtube.com/watch?list=PL123&v=abcdefghijk").id, "abcdefghijk");

assert.deepStrictEqual(parseMedia("https://vimeo.com/123456789"), { type: "vimeo", id: "123456789" });
assert.strictEqual(parseMedia("https://player.vimeo.com/video/123456789").id, "123456789");

assert.deepStrictEqual(parseMedia("/assets/videos/spot.mp4"), {
  type: "file",
  src: "assets/videos/spot.mp4"
});
assert.deepStrictEqual(parseMedia("assets/videos/spot.webm"), {
  type: "file",
  src: "assets/videos/spot.webm"
});
assert.strictEqual(normalizePath("/assets/images/a.jpg"), "assets/images/a.jpg");
assert.strictEqual(normalizePath("https://cdn.example.com/a.jpg"), "https://cdn.example.com/a.jpg");

assert.strictEqual(endpointReady(""), false);
assert.strictEqual(endpointReady("https://formspree.io/f/xxxxxxxx"), false);
assert.strictEqual(endpointReady("https://formspree.io/f/abcdwxyz"), true);
assert.strictEqual(emailReady("hello@example.com"), false);
assert.strictEqual(emailReady("leo@newchapter.ai"), true);

console.log("paths ok");
