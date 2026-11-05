# Otto Vilo — CV site

Static 2-page CV site, deployed via GitHub Pages at `ottovilo.github.io/cv`.

- `index.html` — CV (experience, education, certifications, AI proficiency)
- `performance.html` — performance report / scorecard
- `assets/style.css` — shared stylesheet

No build step, no JS framework, no external font/CDN requests — open any
`.html` file directly in a browser, or serve the folder as-is.

## Before publishing

The city/location field in `index.html` is still a `[placeholder]` — search
for `placeholder` in the HTML and fill it in before going live. Email,
phone, and LinkedIn are already filled in.

## Publish to GitHub Pages

```bash
cd cv-site
git init
git add .
git commit -m "Initial CV site"
gh repo create ottovilo/cv --public --source=. --remote=origin --push
```

Then in the repo's **Settings → Pages**: set Source to the `main` branch,
`/ (root)`. The site goes live at `https://ottovilo.github.io/cv/`.
