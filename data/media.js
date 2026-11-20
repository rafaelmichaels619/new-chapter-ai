/**
 * New Chapter AI Studio — the list you edit.
 *
 * Page wording (headlines, about, services) lives in index.html.
 * Films, stills, the hero background, email, social links, and the
 * contact form all live in this file.
 *
 * ADD A VIDEO
 * 1. Copy an .mp4 or .webm into assets/videos/
 *    OR paste a YouTube or Vimeo link.
 * 2. Optional: copy a poster image into assets/images/
 * 3. Copy one of the objects in `videos` below and fill it in.
 *    Paths must NOT start with a slash, so the site works on GitHub Pages:
 *    "assets/videos/launch-spot.mp4"  (good)
 *    "/assets/videos/launch-spot.mp4" (also ok — the site strips the slash)
 *
 * ADD A STILL
 * 1. Copy a .jpg, .png, or .webp into assets/images/
 * 2. Copy one of the objects in `images` below and set `file`.
 *
 * Leave `file` as "" to keep the labeled placeholder.
 * Optional `frame: "tall"` keeps a full-body portrait from being cropped
 * to the usual 4:5 frame.
 * Leave `thumbnail` as "" and YouTube links will use YouTube's own image.
 * Vimeo does not provide one automatically — add a thumbnail if you want one.
 *
 * EXAMPLE (finished local film):
 * {
 *   title: "Northwind — launch film",
 *   file: "assets/videos/northwind.mp4",
 *   thumbnail: "assets/images/northwind.jpg",
 *   description: "Thirty-second launch film."
 * }
 *
 * EXAMPLE (YouTube):
 * {
 *   title: "Harbor spot",
 *   file: "https://www.youtube.com/watch?v=VIDEO_ID",
 *   thumbnail: "",
 *   description: "A cut hosted on YouTube."
 * }
 *
 * EXAMPLE (Vimeo):
 * {
 *   title: "Night edit",
 *   file: "https://vimeo.com/123456789",
 *   thumbnail: "assets/images/night.jpg",
 *   description: "A cut hosted on Vimeo."
 * }
 */
const SITE = {
  // TODO: replace with your real email. The contact form writes to this
  // address until a form endpoint is set below.
  email: "hello@example.com",

  // TODO: paste a Formspree endpoint to receive the form on the web,
  // for example "https://formspree.io/f/xxxxxxxx"
  // Leave this empty ("") to open the visitor's email app instead.
  formEndpoint: "",

  // Hero background. A local file, a direct .mp4/.webm URL, or a
  // YouTube/Vimeo link. Leave video as "" to show hero.image instead,
  // or the animated backdrop when image is empty too.
  hero: {
    video: "",
    thumbnail: "",
    image: "assets/images/portrait-satin-blouse.jpg"
  },

  // TODO: replace each href with your profile URL.
  // An empty href shows "link soon" instead of a dead link.
  socials: [
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
    { label: "Vimeo", href: "" },
    { label: "TikTok", href: "" }
  ],

  videos: [
    {
      title: "The Spokesperson",
      file: "assets/videos/spokesperson-office.mp4",
      thumbnail: "assets/images/spokesperson-office-poster.jpg",
      description: "An AI spokesperson ad — a presenter who never needs a reshoot."
    }
  ],

  images: [
    {
      title: "Quiet Luxury",
      file: "assets/images/portrait-satin-blouse.jpg",
      thumbnail: "",
      description: "Cream satin and soft window light, held in one still."
    },
    {
      title: "The Executive",
      file: "assets/images/portrait-executive-suit.jpg",
      thumbnail: "",
      description: "A navy suit, city glass, and the calm of a high floor."
    },
    {
      title: "Morning Ritual",
      file: "assets/images/lifestyle-kitchen-selfie.jpg",
      thumbnail: "",
      description: "The first look of the day, in a bright kitchen."
    },
    {
      title: "First Impression",
      file: "assets/images/portrait-boardroom-smile.jpg",
      thumbnail: "",
      description: "A boardroom smile, with the city behind the glass."
    },
    {
      title: "Peak Form",
      file: "assets/images/fitness-gym-portrait.jpg",
      thumbnail: "",
      description: "Full body in the gym — a frame for fitness and apparel.",
      frame: "tall"
    }
  ]
};
