# Portfolio — Muyideen Abdulhakeem

A single-page developer portfolio. Static site, no build step required.

## File structure

```
portfolio-site/
├── index.html        Markup for every section (nav, hero, about, work, playground, toolkit, journey, contact)
├── css/
│   └── style.css      All styling — CSS custom properties (theme tokens), layout, animations
├── js/
│   └── main.js         Scroll spy, mobile menu, theme toggle, reveal-on-scroll, card tilt, color roller, magnetic button
└── README.md
```

## Running it

No build tools needed — it's plain HTML/CSS/JS.

- **Quickest:** double-click `index.html` to open it in a browser.
- **Recommended (avoids any local-file quirks):** serve it locally, e.g.
  ```
  cd portfolio-site
  python3 -m http.server 8000
  ```
  then open `http://localhost:8000`.