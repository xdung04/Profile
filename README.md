# Lưu Xuân Dũng — Personal portfolio

A responsive, single-page portfolio in Vietnamese. Built with HTML, CSS, vanilla JavaScript and the existing local Bootstrap grid/icon assets. No build step or package installation is required.

## Preview

Open `index.html` directly, or serve the repository with a static server:

```sh
python -m http.server 4174 --bind 127.0.0.1
```

Then visit http://127.0.0.1:4174/.

## Content

This is a public personal introduction, not an application page. Keep copy conversational and avoid job-seeking calls to action. The introduction includes running, badminton, trekking and exploring new places.

- Introduction, skills, education, internship experience and contact details updated from the supplied October 2026 CV.
- All eight legacy coursework/project cards and their external links removed.
- Original portrait and one-page navigation retained.
- No downloadable CV or PDF is included in the public website. Original Facebook and Instagram profile links are retained alongside GitHub.
- Content: `index.html`; presentation: `assets/css/main.css`; navigation and motion: `assets/js/main.js`.
- Motion respects `prefers-reduced-motion`. Page content remains readable without JavaScript. Email and phone links use native mail/phone applications; there is no contact-form backend.

Deploy the repository root as a static site (including GitHub Pages). Relative asset links work under the `/Profile/` path. This update does not publish automatically.

## References

- Original foundation: Lonely by BootstrapMade — https://bootstrapmade.com/free-html-bootstrap-template-lonely/
- Layout and navigation reference: https://longka7.github.io/portfolio/
- Typography and spacing reference: https://mobbin.com/sites/sections/cc46fe95-d2fb-46a6-927a-96c9bc6d5ecc

Reference sites were used for design inspiration only; no source code, personal content or imagery was copied from them.
