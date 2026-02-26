# Plan: JMRH Website Overhaul - Elite Academic Edition

## Overview
Transform the Journal of Multidisciplinary Research Horizon (JMRH) into a premium, international-standard academic platform. The focus is on institutional authority, trust, and high-end visual storytelling.

**Project Type**: WEB (React + Vite + Tailwind + Framer Motion)

## Success Criteria
- [ ] **Visual Excellence**: Achieve a "Luxury Academic" aesthetic (Ivory/Charcoal/Gold).
- [ ] **Cinematic Motion**: Every section has scroll-triggered reveals and micro-interactions.
- [ ] **Content Integrity**: Institutional, authoritative language applied across 14 sections.
- [ ] **Interactivity**: All navigation links work with smooth scroll or routing.
- [ ] **Mobile Pro**: Fully responsive with custom mobile navigation.

## Architecture & Design
- **Theme**: "Oxford Luxury" - Mix of serif (`Playfair Display`) and sans-serif (`Inter` or `Outfit`).
- **Animations**: `framer-motion` for staggered reveals, parallax backgrounds, and liquid buttons.
- **Organization**: Component-based architecture in `src/components/sections`.

## File Structure
- `src/components/sections/`
  - `VisionMission.tsx`
  - `Mentorship.tsx`
  - `Consultation.tsx`
  - `ReviewerCommunity.tsx`
  - `Guidelines.tsx`
  - `Ethics.tsx`
  - `ReviewPolicy.tsx`
  - `Archives.tsx`
  - `Contact.tsx`
- `src/hooks/use-scroll-animation.ts`
- `src/styles/animations.css`

## Task Breakdown

### Phase 1: Foundation & Design System (P0)
- **Task 1.1**: Update `tailwind.config.ts` with the "Elite Academic" palette and typography.
  - **Agent**: `frontend-specialist`
  - **Skills**: `tailwind-patterns`, `frontend-design`
  - **INPUT** → Current config, **OUTPUT** → Enhanced theme, **VERIFY** → Colors/fonts active.
- **Task 1.2**: Create `use-scroll-animation.ts` hook for unified Framer Motion variants.
  - **Agent**: `frontend-specialist`
  - **Skills**: `react-best-practices`
  - **INPUT** → New hook, **OUTPUT** → Reusable variants, **VERIFY** → Clean exports.

### Phase 2: Core Section Overhaul (P1)
- **Task 2.1**: Redesign `HeroSection.tsx` with cinematic tagline and high-end CTA.
  - **Agent**: `frontend-specialist`
  - **Skills**: `frontend-design`, `ui-ux-pro-max`
- **Task 2.2**: Update `AboutSection.tsx` and `AimsAndScopeSection.tsx` with institutional content.
- **Task 2.3**: Implement `VisionMission.tsx` and `Mentorship.tsx`.
- **Task 2.4**: Implement `Consultation.tsx` with an "Elite Consultation" card UI.

### Phase 3: Academic Compliance & Governance (P1)
- **Task 3.1**: Create `ReviewerCommunity.tsx` and update `EditorialBoardSection.tsx`.
- **Task 3.2**: Implement `Ethics.tsx` (COPE/UGC standards) and `ReviewPolicy.tsx`.
- **Task 3.3**: Create `Guidelines.tsx` with tabbed content for Manuscript Preparation.

### Phase 4: Integration & Navigation (P2)
- **Task 4.1**: Upgrade `Header.tsx` with a multi-layered premium menu and "Submit" glow CTA.
- **Task 4.2**: Implement `Archives.tsx` and `Contact.tsx`.
- **Task 4.3**: Orchestrate all sections into `Index.tsx` with smooth scroll anchors.

### Phase 5: Polish & SEO (X)
- **Task 5.1**: Apply `seo-specialist` recommendations for ISSN and Academic Ranking.
- **Task 5.2**: Run `ux_audit.py` and `lighthouse_audit.py`.

## Phase X: Verification
- [ ] Purple Ban Check (No violet/purple used)
- [ ] Sharp Geometry Check (Luxury feel)
- [ ] Framer Motion Performance Check
- [ ] Build Test (`npm run build`)
