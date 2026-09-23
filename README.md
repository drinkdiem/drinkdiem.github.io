# diem — coming soon

The temporary launch page for **drinkdiem.com**. It's plain HTML and CSS, with one small script for the signup form. The only external pieces are two Google Fonts and Beehiiv's form script.

```text
index.html           page content
styles.css           all styling (colors + fonts at the top)
script.js            shows a fallback message if the Beehiiv form can't load
diem.png             main product photo
founder.png          Sean's portrait in the founder note
assets/og.jpg        1200×630 link-preview image
_design/             design canvas source files (not published; see below)
```

`_design/` holds the working files behind the design canvas. GitHub Pages' default build skips folders whose names start with `_`, so they never appear on the live site.

---

## 1. Beehiiv signup form

The form is already installed: it's the Beehiiv `<script>` inside `<div class="signup">` in `index.html`. To use a different form, replace that one script tag with the new embed code.

> **Beehiiv's embed only renders over http(s).** If you open `index.html` by double-clicking it (`file://…`), Beehiiv silently shows nothing — this is Beehiiv's own restriction, not something this page's code controls. Always preview with the local server in step 2. `script.js` detects this and swaps in a plain "Signup is temporarily unavailable" message instead of leaving an empty box — you'll see that message during local double-click previews, and the real form once the page is live. It also uses that same fallback as a safety net if the form is ever blocked by an ad/privacy blocker.

The page's CSS stretches the Beehiiv iframe to the column width. You can't restyle the inside of the iframe from this page, so match it in Beehiiv's form editor. Its defaults (serif font, rounded white box) clash with the page:

| Setting            | Value                               |
| ------------------ | ----------------------------------- |
| Background         | Transparent                         |
| Input background   | `#FAF7F2`                           |
| Input border       | `#D9D3C9`                           |
| Text color         | `#1E1D1B`                           |
| Placeholder text   | `Email address`                     |
| Button background  | `#1E1D1B`                           |
| Button text        | `#F4EFE7`, label `Notify me`        |
| Corner radius      | `0`                                 |
| Font               | The cleanest sans-serif offered     |
| Slim / inline mode | On (input and button on one row)    |

## 2. Preview locally

Run a local server from this folder and visit <http://localhost:8000> to see the real Beehiiv form. Double-clicking `index.html` still opens the full page, but shows the signup fallback message instead — see step 1.

```sh
python3 -m http.server 8000
```

## 3. Publish with GitHub Pages

1. Commit and push everything to the `main` branch on GitHub.
2. In the repo, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`. Save.
3. **Custom domain:** in the same screen, enter `drinkdiem.com` and save. GitHub commits a `CNAME` file for you.
4. At your domain registrar, add these DNS records:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@` (optional): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` for `www` → `<github-username-or-org>.github.io`
5. Once DNS resolves, tick **Enforce HTTPS**.

All paths are relative, so the page also works at a `github.io` project URL before the domain is connected.

## 4. Edit copy and colors

**Copy:** everything is in `index.html`, in page order:

- Header: wordmark `<p class="wordmark">` and tagline `<p class="tagline">` (phones show only "Modern energy"; the rest is in `<span class="tagline-rest">`)
- Eyebrow above the headline: `<p class="eyebrow">`
- Headline: `<h1 class="headline">` (the `<em>` makes "brighter" italic; remove it for all-roman)
- Supporting line: `<p class="lede">`
- Line under the form: `<p class="note">`
- Photo caption: `<p class="photo-caption">` (`<br>` sets the line breaks)
- Footer: `<footer class="site-footer">`
- Browser title and link-preview text: the `<title>` and `og:` tags in `<head>`

**Colors and fonts:** the `:root` block at the top of `styles.css`:

```css
--ivory:     #F4EFE7;  /* background */
--charcoal:  #1E1D1B;  /* text */
--ink-soft:  #4F4B46;  /* supporting copy */
--muted:     #8A857E;  /* small print */
--tangerine: #E57A3C;  /* dot, accent rule */
```

The sunrise mark is the inline SVG in the header. Its silver gradient stops are in the `<linearGradient id="silver">` block.

**Photo:** change the path in the `style="--image: url('…')"` attribute in `index.html`. The current product photo is `diem.png`. If the file is missing, that panel shows a quiet CSS fallback, so the page never looks broken.

> The original `metal.png`, `moodboard.png`, `ocean.png`, `upclose.png` and `water.png` in the repo root (~8 MB) aren't used by the page directly — they're the source files the `assets/` images were exported from. Move them out of the repo if you want a lighter deploy.
