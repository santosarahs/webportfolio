# Sarah Santos — Web Portfolio

A single-page personal portfolio built with plain HTML, CSS, and JavaScript on top of
Bootstrap 5. It covers an about section, project highlights (Bootstrap modals), a tools
grid, and a contact section with an embedded map and a validated contact form.

## Project structure

| File         | Purpose                                                        |
| ------------ | ------------------------------------------------------------- |
| `index.html` | Page markup and content                                       |
| `index.css`  | Theme tokens, layout, animations, responsive rules            |
| `index.js`   | Nav behaviour, scroll-spy, reveal-on-scroll, form validation  |
| `images/`    | Logos, icons, and photos                                      |

## Running locally

It is a static site — open `index.html` directly, or serve the folder:

```bash
npx serve .
```

Then visit the printed URL.

## Enhancements in this version

- **Mobile support**: added the missing `viewport` meta tag, `charset`, and `lang`
  so the responsive layout actually works on phones.
- **SEO / sharing**: meta description, Open Graph and Twitter card tags, favicon,
  and `theme-color`.
- **Accessibility**: skip-to-content link, real `alt` text on every image,
  `aria-label`s on icon links and project triggers, associated form error
  messages, visible keyboard focus, and duplicate `id`s replaced with classes.
- **Interactivity** (`index.js`, previously empty):
  - navbar collapses automatically after a link is tapped on mobile
  - scroll-spy highlights the current section in the nav
  - sections fade in on scroll (respecting `prefers-reduced-motion`)
  - floating "back to top" button
  - contact form with client-side validation and a `mailto:` handoff, plus a
    honeypot field for basic bot filtering
  - footer year updates automatically
- **Styling**: CSS custom properties for the palette, fluid `clamp()` type,
  project cards with hover captions, polished nav underline, dark-themed form
  controls, and `scroll-margin-top` so the sticky navbar no longer hides headings.
