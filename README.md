# Cockwatch

An overly invested fan's Cockguesser release investigation. Hot pink and plum branding adapted from the game previews in the ZUCC Signal chat. The evidence quotes were manually reviewed on 12 October 2026; the board is a curated snapshot, not a live Signal integration. Screenshots are recreated as a small branding study rather than embedding private chat images.

## Run

Requires Node 22 or newer. No dependencies or build step.

```sh
npm start
```

Open http://localhost:3000. Set `PORT` to change the port. `npm test` checks date calculations and expired countdown handling.

## Railway

Push this folder to a GitHub repository, then create a Railway service from that repository. Start command: `npm start`. Generate a domain in the service networking settings. The server binds to `0.0.0.0` and uses Railway's `PORT`. A `/health` endpoint and `railway.json` are included. No environment secrets, database, or paid API required.

## Content and forecast

- `public/index.html`: evidence, copy and page layout.
- `public/style.css`: branding and responsive layouts. Google Fonts supplies Fredoka, Space Grotesk and Caveat; system fonts work if unavailable.
- `public/forecast.js`: fixed fictional dates, confidence scores and feature-delay rules. Default forecast is 19 October 2026, 18:00 Zagreb time. Expired dates stay expired rather than silently becoming tomorrow.
- `public/app.js`: mood controls, countdown, theory generator and copy button. Copying does not send a message.

All dates, curves and confidence scores are clearly labelled satire. The site never checks whether the actual game is live.

Domain ideas (availability not checked): `cockwhen.com`, `waitingforcock.com`, `letitdrop.lol`, `cockwatch.lol`, `isittomorrowyet.com`.
