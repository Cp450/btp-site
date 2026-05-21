# Professional Frontend Builder Skill

A comprehensive, production-ready skill for building visually stunning, accessible, performant frontends across all use cases and frameworks.

## Overview

This skill guides you through building professional websites, SaaS dashboards, e-commerce sites, portfolios, and admin panels. It covers:

- ✅ Framework selection (Next.js, Vue, Svelte, Astro)
- ✅ Design systems & tokens (color palettes, typography, spacing)
- ✅ Component architecture (atomic design, reusable patterns)
- ✅ Animations & micro-interactions (Framer Motion, Vue Transitions, Svelte)
- ✅ Responsive design (mobile-first, all breakpoints)
- ✅ Accessibility (WCAG 2.1 AA compliance)
- ✅ Performance optimization (LCP, CLS, bundle splitting)
- ✅ Image strategy (remote assets, optimization, credits)
- ✅ SEO & metadata
- ✅ Quality assurance (pre-launch checklist)

## When to Use This Skill

**Perfect triggers:**
- "Build a landing page for..."
- "Create a SaaS dashboard"
- "Design a professional website"
- "Make a portfolio site"
- "Build an admin panel"
- "Create a design system"
- "Optimize my website's performance"
- "Help me choose a frontend framework"

## Skill Structure

```
professional-frontend-builder/
├── SKILL.md                          # Main documentation
├── test-suite.json                   # 5 comprehensive test cases
├── README.md                         # This file
└── references/
    ├── design-tokens.md              # Tailwind configs for 5 aesthetic systems
    ├── component-patterns.md         # Copy-paste component code (React/Vue/Svelte)
    ├── performance-checklist.md      # Optimization techniques & benchmarks
    └── framework-comparison.md       # Next.js vs Vue vs Svelte detailed guide
```

## Key Features

### 1. **Multi-Framework Support**
- Next.js (default, recommended)
- Vue 3 (gentle, component-focused)
- Svelte (performance, animation-first)
- Astro (content-heavy, static-first)

Choose based on your needs; the skill adapts.

### 2. **5 Pre-Built Design Aesthetics**
Each with complete Tailwind config:
- **Luxury/Premium** (dark, glassmorphism, neon accents)
- **Minimal/Clean** (white, blue, sans-serif)
- **Corporate/Professional** (navy, confident, trusting)
- **Tech/Playful** (dark, neon, energetic)
- **Warm/Organic** (earth tones, gentle, lifestyle)

### 3. **Production-Ready Components**
- Atoms (Button, Card, Input, Badge)
- Molecules (SearchInput, FormGroup)
- Organisms (Hero, ProductGrid, PricingTiers, Navbar)

All with accessibility, dark mode, and hover states built-in.

### 4. **Performance-First**
- Core Web Vitals targeting (LCP, CLS, FID)
- Image optimization guide
- Code-splitting strategies
- Font loading best practices
- Bundle analysis

Target: 90+ Lighthouse score

### 5. **Accessibility-First**
- WCAG 2.1 AA compliance checklist
- Semantic HTML examples
- Focus management
- ARIA labels
- Color contrast guidance
- Keyboard navigation
- Screen reader testing steps

### 6. **Quality Assurance**
Pre-launch checklist covering:
- Visual & typography
- Responsiveness (3+ breakpoints)
- Accessibility (keyboard, screen reader, colors)
- Performance (LCP, CLS, bundle size)
- SEO (metadata, structured data, alt text)
- Code quality (TypeScript, ESLint, no unused imports)

## Workflow

### Step 1: Choose Your Framework
Read `references/framework-comparison.md` or ask the skill for a recommendation based on your project.

```
Next.js?        → Best all-around, full-stack, largest ecosystem
Vue 3?          → Gentle syntax, component-focused
Svelte?         → Smallest bundle, animation-first
Astro?          → Content-heavy, static-first
```

### Step 2: Set Up Design System
Copy the relevant design tokens from `references/design-tokens.md` into your `tailwind.config.ts`. Choose ONE aesthetic and adapt to your brand.

```typescript
// Example: Luxury palette
colors: {
  surface: { ... },
  accent: { cyan: ..., purple: ..., magenta: ... },
  gold: { ... }
}
```

### Step 3: Build Components
Use patterns from `references/component-patterns.md` as starting points. Adapt to your framework (React/Vue/Svelte syntax).

Examples include:
- Button with 4 variants
- Card with 3 styles
- Input with error states
- Hero section with Framer Motion
- Grid of items with stagger animation
- Navbar with mobile menu

### Step 4: Implement Accessibility
Follow the accessibility section in SKILL.md:
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<button>`)
- Add ARIA labels for screen readers
- Manage focus (Tab order, modals, skip links)
- Test with VoiceOver / NVDA
- Verify color contrast (4.5:1 minimum)

### Step 5: Optimize Performance
Apply techniques from `references/performance-checklist.md`:
- Configure `next/image` with remote domains
- Lazy-load below-fold images
- Split code with dynamic imports
- Configure font loading with `display: swap`
- Purge unused Tailwind CSS
- Defer third-party scripts
- Measure with Lighthouse

### Step 6: Run QA Checklist
Before launch, verify:
- [ ] Typography consistent
- [ ] Colors match design system
- [ ] Spacing follows 4px grid
- [ ] Responsive on iPhone SE, iPad, Desktop
- [ ] Focus states visible
- [ ] Images have alt text
- [ ] No console errors
- [ ] Lighthouse ≥ 90 (Performance)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

## Example: Build a Landing Page

### Scenario
Client: "We're a luxury travel agency called 'Aurora Luxe'. Build a landing page."

### Solution (Abbreviated)

#### 1. Framework
Next.js (full-stack, SEO-friendly, best for landing pages)

#### 2. Design System
Use Luxury/Premium palette from `design-tokens.md`:
```typescript
// tailwind.config.ts
colors: {
  surface: { 900: '#212121', 950: '#0a0a0a' },
  accent: { cyan: '#00d4ff', purple: '#8b5cf6', magenta: '#ec4899' }
}
```

#### 3. Sections (from SKILL.md)
- Sticky navbar with logo + nav links + CTA button
- Hero (big headline, subtext, 2 CTAs, background image)
- Destinations grid (6 cards, hover shimmer)
- Signature experiences (3 feature cards)
- Membership tiers (3 columns)
- Testimonials (carousel or cards)
- Concierge form (name, email, interests, budget)
- Footer (credits, links)

#### 4. Components
Use patterns from `component-patterns.md`:
- Button (primary/secondary variants)
- Card (interactive, with hover lift)
- Input (with error states)
- Hero section (gradient overlay, Framer Motion)
- Grid of items (staggered reveal)
- Navbar (sticky, mobile menu)

#### 5. Images
Remote Unsplash URLs:
```
Hero: https://source.unsplash.com/featured/2400x1400?luxury,travel
Destination 1: https://source.unsplash.com/featured/1200x900?maldives,resort
Destination 2: https://source.unsplash.com/featured/1200x900?tokyo,skyline
... (etc.)
```

Configure in `next.config.js`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'source.unsplash.com' }
  ]
}
```

#### 6. Accessibility
- Semantic HTML throughout
- Focus rings on all interactive elements
- ARIA labels on buttons without text
- Alt text on all images
- Heading hierarchy (H1 → H2 → H3)
- Test with keyboard navigation

#### 7. Performance
- Use `next/image` for all images
- Lazy-load below-fold images
- Split heavy components (dynamic imports)
- Fonts with `display: swap`
- Target Lighthouse ≥ 90

#### 8. QA
Run pre-launch checklist:
- ✅ Typography consistent (Space Grotesk + Inter)
- ✅ Colors match luxury palette
- ✅ Spacing on 4px grid
- ✅ Responsive on 3+ breakpoints
- ✅ Focus states visible
- ✅ Images have alt text
- ✅ No console errors
- ✅ Lighthouse 92 (Performance)

**Result:** Production-ready landing page! 🎉

## Testing

This skill includes 5 comprehensive test cases in `test-suite.json`:

1. **Luxury SaaS Landing Page (Next.js)** – Full landing page with all sections
2. **Admin Dashboard (Vue 3)** – Dashboard with router, forms, tables
3. **E-Commerce Performance** – Optimization techniques applied
4. **Design System** – Reusable colors, typography, components
5. **Framework Decision** – Recommendation for a client scenario

To validate the skill:
```bash
# Run test cases
npm test  # or however your test framework runs

# Or manually verify
# 1. Read test case prompt
# 2. Follow skill guidance
# 3. Verify output against success criteria
```

## Quick Reference

### Common Imports

```typescript
// Next.js
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

// Colors (from tailwind.config)
className="bg-surface-950 text-accent-cyan hover:shadow-lg"

// Components
<Button variant="primary" size="lg">Click me</Button>
<Card variant="interactive">Content</Card>
<Input type="email" placeholder="you@example.com" />
```

### Common Patterns

```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Scroll reveal
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>

// Hover lift
<motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>

// Glassmorphism
className="bg-glass backdrop-blur-md border border-surface-800"

// Focus ring
className="focus-visible:outline-2 outline-offset-2 outline-accent-cyan"
```

## Resources Included

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill documentation (all-in-one) |
| `design-tokens.md` | 5 Tailwind configs (copy-paste ready) |
| `component-patterns.md` | Reusable components (React/Vue/Svelte) |
| `performance-checklist.md` | Optimization techniques + benchmarks |
| `framework-comparison.md` | Next.js vs Vue vs Svelte detailed guide |
| `test-suite.json` | 5 test cases with success criteria |

## External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance Guide](https://web.dev/performance)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Support

**For framework questions:**
→ See `references/framework-comparison.md`

**For design/colors:**
→ See `references/design-tokens.md`

**For component code:**
→ See `references/component-patterns.md`

**For performance:**
→ See `references/performance-checklist.md`

**For accessibility:**
→ See SKILL.md > "Accessibility & SEO" section

**For the full workflow:**
→ See SKILL.md main document

---

**Last Updated:** 2025 | **Version:** 1.0

Build with confidence. Ship with polish. ✨
