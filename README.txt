# Convergence — PWA vertical slice

This is the first playable foundation of the choice-driven visual novel.

Included now:
- iPhone-ready PWA shell
- Home-screen manifest/icons
- offline service worker
- 5 renameable save slots
- separate autosave
- branching choices
- hidden relationship values
- morality variables
- Revan alignment variable (starts Light Side)
- Miku and Nino start without magic and awaken after the Merge
- first playable opening slice

## Test on a PC
Because service workers/local storage work best from a local web server:

1. Extract this ZIP.
2. Open Command Prompt in the extracted folder.
3. Run:
   `python -m http.server 8000`
4. Open:
   `http://localhost:8000`

## Put on an iPhone for free
The finished version should be hosted on a free HTTPS service such as GitHub Pages or Cloudflare Pages.
Then open the HTTPS game link in Safari and use:
Share → Add to Home Screen

After installation, the icon launches the game in standalone mode and the service worker caches the game for offline use.

Note: deleting Safari website data or removing site data can erase browser-based saves. A later build can add export/import backups.
