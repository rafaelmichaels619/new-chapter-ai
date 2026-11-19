/**
 * New Chapter AI — the list you edit.
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
  // YouTube/Vimeo link. Leave video as "" for the animated backdrop.
  hero: {
    video: "",
    thumbnail: ""
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
      title: "Opening spot",
      file: "",
      thumbnail: "",
      description: "Placeholder for a cinematic brand film. Drop a file in assets/videos and set the path here."
    },
    {
      title: "Product reel",
      file: "",
      thumbnail: "",
      description: "Placeholder for a product or launch film."
    },
    {
      title: "Social cutdown",
      file: "",
      thumbnail: "",
      description: "Placeholder for a vertical reel or a short cutdown."
    },
    {
      title: "Mood piece",
      file: "",
      thumbnail: "",
      description: "Placeholder for a short film or an experiment."
    }
  ],

  images: [
    {
      title: "Frame 01",
      file: "",
      thumbnail: "",
      description: "Placeholder still. Put an image in assets/images and set file to its path."
    },
    {
      title: "Frame 02",
      file: "",
      thumbnail: "",
      description: "Placeholder still. The grid crops to the frame; the full image opens on click."
    },
    {
      title: "Frame 03",
      file: "",
      thumbnail: "",
      description: "Placeholder still."
    },
    {
      title: "Frame 04",
      file: "",
      thumbnail: "",
      description: "Placeholder still."
    },
    {
      title: "Frame 05",
      file: "",
      thumbnail: "",
      description: "Placeholder still."
    },
    {
      title: "Frame 06",
      file: "",
      thumbnail: "",
      description: "Placeholder still."
    }
  ]
};
