# TODO — SkyOps Fleet Portal Premium Redesign

## Step 1 — Visual Foundation
- [x] Update `src/index.css` to add layered luxury background (gradients + grid + noise + vignette), ambient lighting, and refined depth/shadow tokens.
- [x] Add radar/HUD animation tokens (pulse, sweep, blip) and unify border glow + reflection styles.







## Step 2 — Command Bar (Top Nav)
- [ ] Update `src/App.jsx` markup for command bar: breadcrumbs, search, notifications, system status, weather mock, UTC clock, profile trigger, command palette trigger.
- [ ] Add/adjust corresponding styles in `src/index.css`.

## Step 3 — Spaceship Sidebar
- [ ] Update `src/Components/Sidebar.jsx` for active gradient pill indicator + micro-interactions + floating glass styling.
- [ ] Enhance sidebar styles in `src/index.css` (28px radius, inner shadows, hover motion, collapse behaviors).

## Step 4 — Cinematic Hero + Cockpit Visuals
- [ ] Update `src/Components/GlassFlightHero.jsx` to add radar sweep SVG + flight path curves + animated blips.
- [ ] Add hero sub-widgets (live operational mini tiles) and update styles in `src/index.css`.

## Step 5 — Right Panel Intelligence / Layout Balance
- [ ] Update `src/Components/Dashboard.jsx` to introduce right-side aerospace analytics HUD panel.
- [ ] Convert dashboard into a premium two-column composition with balanced spacing.

## Step 6 — Card Consistency Pass
- [ ] Refine `src/Components/FlightsTable.jsx` and `src/Components/AddFlight.jsx` spacing/borders/hover states to match new tokens.

## Step 7 — Verification
- [ ] Run `npm run build` (or `npm run dev` smoke) and verify layout responsiveness.

