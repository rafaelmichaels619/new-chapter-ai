# New Chapter AI Studio

A one-page site for New Chapter AI Studio: AI films and still images, and cinematic ads for brands.

Two jobs, one page:

- **Portfolio** — a film reel and a still-image gallery.
- **For hire** — what a cinematic ad engagement includes, how it works, and a way to get in touch.

Nothing here needs a build step. It is plain HTML, CSS, and JavaScript. GitHub Pages can host it for free.

The address it is set up for:

**https://rafaelmichaels619.github.io/new-chapter-ai/**

The films and pictures are not in the repo yet. Every empty slot is labeled **Placeholder**. Adding a real piece is a file drop plus one edit in `data/media.js`.

## Preview it on your computer

From this folder, in a terminal:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

You can also double-click `index.html`. A local server is the closer match to GitHub Pages.

## Add a video

1. Copy the file into `assets/videos/`. Use `.mp4` or `.webm`.
2. If you have a poster image, copy it into `assets/images/`.
3. Open `data/media.js`.
4. In the `videos` list, copy one of the blocks and fill it in. Or replace a placeholder block.

```js
{
  title: "Northwind — launch film",
  file: "assets/videos/northwind.mp4",
  thumbnail: "assets/images/northwind.jpg",
  description: "Thirty-second launch film."
}
```

5. Save the file and refresh the browser.

Leave `file` as `""` and the card stays a labeled placeholder. Leave `thumbnail` blank only when you are fine with a plain card (YouTube is the exception below).

Write the path **without** a leading slash: `assets/videos/northwind.mp4`. The site also forgives a leading slash, because the live site is not at the root of the domain. It lives at `/new-chapter-ai/`, and a path that starts with `/` would otherwise point at the wrong place.

### YouTube or Vimeo

Put the link in `file` instead of a local path. Both of these work:

```js
file: "https://www.youtube.com/watch?v=VIDEO_ID",
file: "https://vimeo.com/123456789",
```

Shorts and `youtu.be` links work too. If `thumbnail` is empty, a YouTube film uses YouTube's own image. Vimeo does not, so add a thumbnail from `assets/images/` when you want one on the grid.

Clicking the card opens the film in a lightbox. Local files play in the browser. YouTube and Vimeo open as embeds.

### Hero background

The big opening frame can play a film behind the name. In `data/media.js`, set `hero.video` to a local file or a YouTube/Vimeo link, and `hero.thumbnail` to a poster if you have one. If there is no film, set `hero.image` to a still in `assets/images/` and it sits on the right of the hero (full-bleed on a phone). Leave both empty and the slow color backdrop stays. A film always takes the slot over the still.

## Add a still

1. Copy a `.jpg`, `.png`, or `.webp` into `assets/images/`.
2. In `data/media.js`, add a block to the `images` list (or replace a placeholder):

```js
{
  title: "Frame 01",
  file: "assets/images/frame-01.jpg",
  thumbnail: "",
  description: "A still from the night spot."
}
```

`thumbnail` is optional. When it is empty, the grid uses `file`. The grid crops the picture to the frame. Clicking it opens the full image.

Delete a block to remove that slot. The order in the list is the order on the page. The first video is the wide one at the top of the reel.

## Change the words

Headlines, the about text, and the services copy are in `index.html`. Search for the sentence and edit it.

## Email, the contact form, and social links

All three are in `data/media.js`.

- **email** — `hello@newchapteraistudio.com`. Until a form service is connected, **Send the brief** opens the visitor's email app with the message filled in, addressed to this inbox.
- **formEndpoint** — `TODO`: leave this as `""`, or paste a Formspree endpoint such as `https://formspree.io/f/xxxxxxxx` if you want the form to send without opening an email app. Create a form at [formspree.io](https://formspree.io), copy its endpoint, and paste it between the quotes. The page says, in the contact section, which of the two modes is active.
- **socials** — `TODO`: paste each profile URL into `href`. An empty `href` shows the name with "link soon" instead of a link that goes nowhere.

## How this gets onto GitHub Pages

A workflow in `.github/workflows/pages.yml` publishes the site every time `main` changes. It copies the page, the styles, the scripts, and the `assets` folder, then hands that folder to GitHub Pages. There is no install and no build.

Paths in the HTML (`css/styles.css`, `data/media.js`, and so on) are relative on purpose, so they work at `https://rafaelmichaels619.github.io/new-chapter-ai/` and also at `http://localhost:8080`.

### Turn Pages on (once)

Pages is not on yet. After this work is merged:

1. Merge the pull request into `main`.
2. On GitHub, open the repo **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. The workflow is named **Deploy GitHub Pages**. If GitHub asks you to approve it the first time, approve it.
5. When that run finishes in green, the site is at [https://rafaelmichaels619.github.io/new-chapter-ai/](https://rafaelmichaels619.github.io/new-chapter-ai/).

The first publish can take a minute. Later edits to `main` publish themselves. You can also run the workflow by hand from the Actions tab (**Run workflow**).

You do not need a custom domain, Node, or a hosting bill for this.

## What is where

| File | What it is |
| --- | --- |
| `index.html` | The page: hero, reel, gallery, services, about, contact |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Use |
| `404.html` | Missing-page screen |
| `robots.txt` | Crawler rules and the sitemap address |
| `sitemap.xml` | Pages search engines should list |
| `css/styles.css` | Look, motion, and the phone layout |
| `js/main.js` | Lightbox, menus, and the contact form |
| `data/media.js` | The list of films, stills, email, socials, and the form endpoint |
| `assets/videos/` | Your video files |
| `assets/images/` | Stills and thumbnails |
| `.github/workflows/pages.yml` | The GitHub Pages deploy |

## Check the link logic

From this folder:

```bash
node tests/paths.test.js
```

That checks YouTube, Vimeo, and local paths, including the leading-slash case the Pages subpath cares about.
