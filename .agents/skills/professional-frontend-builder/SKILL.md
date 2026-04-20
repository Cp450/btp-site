---
name: professional-frontend-builder
description: Build production-ready, visually stunning frontends for any use case (landing pages, dashboards, e-commerce, portfolios, admin panels). Supports Next.js, Vue, Svelte, and other modern frameworks. Delivers Apple-level polish with custom design systems, accessibility-first approach, performance optimization, and reusable component architecture. Use this skill whenever building professional websites, applications, or landing pages that require high-quality design, smooth animations, responsive layouts, and semantic HTML. Trigger on requests like "build a landing page", "create a dashboard", "design a website", "make a SaaS app", or any frontend project requiring premium polish and modern tech stack.
compatibility: Node.js 18+, package managers (npm/yarn/pnpm)
---

# Professional Frontend Builder

A comprehensive skill for building production-ready frontends across all use cases and frameworks. This skill guides you from design system setup through component architecture, animations, accessibility, performance optimization, and deployment.

## Quick Navigation

- **[Design Philosophy](#design-philosophy)** – Principles for premium frontends
- **[Framework Selection](#framework-selection)** – Next.js vs Vue vs Svelte
- **[Project Setup](#project-setup)** – Initialization & structure
- **[Design System](#design-system)** – Colors, typography, spacing, tokens
- **[Component Architecture](#component-architecture)** – Reusable, accessible components
- **[Animations & Micro-interactions](#animations--micro-interactions)** – Smooth, purposeful motion
- **[Responsive Design](#responsive-design)** – Mobile-first methodology
- **[Accessibility & SEO](#accessibility--seo)** – WCAG 2.1 AA compliance
- **[Performance Checklist](#performance-checklist)** – Optimization guidelines
- **[Image Strategy](#image-strategy)** – Remote assets, optimization, credits
- **[Quality Assurance](#quality-assurance)** – Pre-launch checklist
- **[References](#references)** – Additional resources

---

## Design Philosophy

### Core Principles

1. **Purposeful Design** – Every pixel serves a function. No unnecessary decoration.
2. **Premium Feel** – Consistent spacing, refined typography, tasteful animations.
3. **Accessibility First** – WCAG 2.1 AA minimum; keyboard navigation, screen readers, semantic HTML.
4. **Performance as Feature** – Fast load times are part of the user experience.
5. **Responsive by Default** – Mobile-first; looks excellent on iPhone to 4K desktop.
6. **System Thinking** – Reusable components, tokens, patterns; not one-offs.

### Design Aesthetics (Adaptable)

Choose ONE primary aesthetic for cohesion, then mix carefully:

| Style | Use Case | Primary Colors | Typography | Motion |
|-------|----------|---|---|---|
| **Luxury/Premium** | High-end services, travel, finance | Near-black + icy white + accent gradients | Space Grotesk + Inter | Subtle, elegant, slow |
| **Minimal/Clean** | SaaS, productivity tools, portfolios | White/off-white + single accent | Inter + SF Mono | Minimal, snappy |
| **Corporate/Professional** | B2B, consulting, enterprise | Navy + white + blue accents | Plus Jakarta Sans + Inter | Confident, measured |
| **Tech/Playful** | Startups, dev tools, gaming | Dark/neon, vibrant accents | Space Mono + Inter | Dynamic, energetic |
| **Warm/Organic** | E-commerce, wellness, lifestyle | Warm neutrals + earth tones | Sohne + Inter | Gentle, flowing |

---

## Framework Selection

### When to Use Each

#### **Next.js (Recommended Default)**
- ✅ Full-stack capability (API routes, middleware)
- ✅ Image optimization built-in
- ✅ SEO-friendly (SSR, metadata)
- ✅ Largest ecosystem (shadcn/ui, Framer Motion, etc.)
- ✅ Best for: Landing pages, SaaS, dashboards, e-commerce
- 📦 Setup: `npx create-next-app@latest --typescript --tailwind`

#### **Vue 3**
- ✅ Excellent DX, gentle learning curve
- ✅ Composition API is very clean
- ✅ Smaller bundle than Next.js
- ✅ Best for: Component-heavy SPAs, internal tools, portfolios
- 📦 Setup: `npm create vue@latest -- --typescript --router --tailwind`

#### **Svelte**
- ✅ Smallest bundle size
- ✅ True reactivity (no virtual DOM)
- ✅ Great animation story
- ✅ Best for: Performance-critical, animation-heavy UIs
- 📦 Setup: `npm create svelte@latest` (SvelteKit for SSR)

---

## Project Setup

### Folder Structure (Next.js Example)

```
project-name/
├── app/
│   ├── layout.tsx              # Global layout + fonts
│   ├── page.tsx                # Homepage
│   ├── (dashboard)/            # Route group
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   └── api/                    # Optional: API routes
├── components/
│   ├── ui/                     # Reusable atoms
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/                 # Page-level sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── features/               # Feature-specific components
│       ├── ProductGrid.tsx
│       ├── PricingTiers.tsx
│       └── Testimonials.tsx
├── data/
│   ├── products.ts             # Mock data or type defs
│   ├── testimonials.ts
│   └── navigation.ts
├── styles/
│   ├── globals.css             # Tailwind directives
│   └── animations.css          # Custom animations
├── lib/
│   ├── cn.ts                   # Classname helper
│   ├── api.ts                  # Client API wrappers
│   └── constants.ts
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── tailwind.config.ts          # Custom colors, fonts, extend
├── tsconfig.json
├── next.config.js              # Image domains, rewrites
├── .env.example
├── README.md
└── package.json
```

### Initial Setup Checklist

- [ ] Framework installed & project initialized
- [ ] TypeScript configured (strict mode)
- [ ] Tailwind CSS + plugins (forms, typography, container queries)
- [ ] Fonts imported (Google Fonts or self-hosted)
- [ ] classnames utility (`cn()`) created
- [ ] Next.js image domains configured (if using remote images)
- [ ] Framer Motion or animation library installed
- [ ] `.env.example` created with required vars
- [ ] Git initialized, `.gitignore` updated
- [ ] ESLint + Prettier configured

---

## Design System

### Color Tokens (Tailwind)

**Example: Luxury Aesthetic**

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          900: '#0a0a0a',
          950: '#000000',
        },
        accent: {
          cyan: '#00d4ff',
          purple: '#8b5cf6',
          magenta: '#ec4899',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-dark': 'rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
};
```

### Typography Scale

| Use | Font | Size | Weight | Line Height |
|-----|------|------|--------|-------------|
| H1 | Space Grotesk | 3.5rem (56px) | 700 | 1.2 |
| H2 | Space Grotesk | 2.25rem (36px) | 700 | 1.3 |
| H3 | Space Grotesk | 1.5rem (24px) | 600 | 1.4 |
| Body | Inter | 1rem (16px) | 400 | 1.6 |
| Small | Inter | 0.875rem (14px) | 400 | 1.5 |
| Caption | Inter | 0.75rem (12px) | 500 | 1.4 |

### Spacing Scale

Use Tailwind's default 4px grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128`

**Applied**:
- Padding within components: `p-4` to `p-8`
- Margins between sections: `my-12` to `my-24`
- Gap in grids: `gap-6` to `gap-8`

### Shadows & Elevation

```css
/* Subtle (cards, hover states) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Medium (modals, popovers) */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

/* Large (hero, focus states) */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

/* Glow (premium effect) */
box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
```

### Radius Scale

- Buttons, inputs: `rounded-lg` (8px)
- Cards, sections: `rounded-2xl` (16px)
- Modals, large containers: `rounded-3xl` (24px)

---

## Component Architecture

### Atomic Structure

#### 1. **UI Atoms** (Foundational)

Unstyled or minimally styled, highly reusable.

```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium transition-all focus-visible:outline-2 outline-offset-2',
        // Size variants
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Color variants
        variant === 'primary' && 'bg-accent-cyan text-black hover:opacity-90',
        variant === 'secondary' && 'bg-surface-900 text-white border border-surface-700',
        variant === 'ghost' && 'text-accent-cyan hover:bg-surface-900',
        className
      )}
      {...props}
    />
  );
}
```

#### 2. **Molecules** (Combinations)

Small, meaningful combinations of atoms.

```tsx
// components/ui/Card.tsx
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      'rounded-2xl border border-surface-800 bg-glass backdrop-blur-sm p-6',
      className
    )}>
      {children}
    </div>
  );
}

// components/ui/SearchInput.tsx
export function SearchInput() {
  const [query, setQuery] = useState('');
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          'w-full px-4 py-2 rounded-lg bg-surface-900 text-white',
          'border border-surface-700 focus:border-accent-cyan',
          'transition-colors'
        )}
      />
      <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-surface-600" />
    </div>
  );
}
```

#### 3. **Organisms** (Feature Sections)

Complex, feature-specific components (Hero, ProductGrid, Pricing, etc.).

```tsx
// components/features/PricingTiers.tsx
export function PricingTiers() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map((tier) => (
          <Card key={tier.id} className={tier.featured ? 'ring-2 ring-accent-cyan' : ''}>
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <p className="text-surface-400 mb-6">{tier.description}</p>
            <div className="text-3xl font-bold mb-6">${tier.price}<span className="text-sm">/mo</span></div>
            <Button className="w-full mb-6">Get Started</Button>
            <ul className="space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-accent-cyan" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `HeroSection.tsx`)
- **Hooks**: camelCase, prefix with `use` (`useScroll.ts`, `useIntersectionObserver.ts`)
- **Files**: Match component name + lowercase for utilities (`button.tsx`, `hero.tsx`)
- **Props interfaces**: ComponentNameProps (`ButtonProps`, `CardProps`)

---

## Animations & Micro-interactions

### Framework-Specific

**Next.js / React**: Use Framer Motion

```tsx
import { motion } from 'framer-motion';

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Hover lift
<motion.button
  whileHover={{ y: -4 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>

// Stagger children
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

**Vue 3**: Use built-in `<Transition>` + CSS animations

```vue
<template>
  <Transition name="fade">
    <div v-if="show">Content</div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
```

**Svelte**: Use transitions natively

```svelte
<script>
  import { fade } from 'svelte/transition';
  let show = true;
</script>

<div transition:fade={{ duration: 300 }}>
  Content
</div>
```

### Best Practices

- ✅ Keep animations < 500ms for micro-interactions
- ✅ Use `ease-out` for entrance, `ease-in` for exit
- ✅ Reduce motion for users with `prefers-reduced-motion`
- ✅ Animate transform & opacity (GPU-friendly)
- ❌ Avoid animating layout properties (width, height)
- ❌ Don't auto-play animations on page load (let user trigger or use scroll-reveal)

---

## Responsive Design

### Breakpoints (Tailwind Standard)

```
sm: 640px    (mobile landscape)
md: 768px    (tablet)
lg: 1024px   (small desktop)
xl: 1280px   (desktop)
2xl: 1536px  (large desktop)
```

### Mobile-First Workflow

1. Design mobile layout first (full width, single column)
2. Add `md:` prefix for tablet improvements
3. Add `lg:` / `xl:` prefixes for desktop refinements

```tsx
// Example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Tablet: 2, Desktop: 3 */}
</div>

<nav className="flex flex-col md:flex-row gap-4">
  {/* Mobile: vertical menu, Desktop: horizontal */}
</nav>
```

### Touch-Friendly Targets

- Minimum tap target: 44px × 44px
- Touch padding: `p-2` minimum around interactive elements
- Avoid hover-only interactions; use active states

```tsx
<button
  className="px-4 py-3 md:px-6 md:py-4 rounded-lg
    hover:bg-accent-cyan active:scale-95
    transition-all focus-visible:outline-2"
>
  Touch-friendly Button
</button>
```

---

## Accessibility & SEO

### Accessibility (WCAG 2.1 AA)

#### Semantic HTML
```tsx
// ✅ Good
<nav>...</nav>
<main>...</main>
<article>...</article>
<button>Click me</button>
<a href="/">Home</a>

// ❌ Avoid
<div onClick={...}>Click me</div>
<div role="button">Click me</div>
```

#### Color Contrast
- Text on background: 4.5:1 for normal text, 3:1 for large text
- Use tools: WebAIM Contrast Checker

#### Focus Management
```tsx
// All interactive elements must have visible focus
input, button, a {
  outline: 2px solid cyan;
  outline-offset: 2px;
}

// Manage focus for modals
<Dialog onOpenAutoFocus={firstInputRef} onCloseAutoFocus={triggerButtonRef}>
```

#### ARIA Labels
```tsx
<button aria-label="Close menu">
  <X className="h-5 w-5" />
</button>

<div aria-live="polite" aria-atomic="true">
  {errorMessage}
</div>

<nav aria-label="Main navigation">
  <ul>...</ul>
</nav>
```

#### Keyboard Navigation
- Tab order follows logical content flow
- Trap focus in modals
- Escape to close modals/menus

#### Screen Reader Testing
- Use NVDA (Windows) or VoiceOver (Mac) regularly
- Test headings, forms, dynamic content, error messages

### SEO

#### Metadata
```tsx
// app/layout.tsx
export const metadata = {
  title: 'Aurora Luxe Travel | Ultra-Premium Concierge',
  description: 'Bespoke luxury travel experiences for discerning travelers.',
  keywords: 'luxury travel, concierge, private jet, yacht',
  openGraph: {
    title: 'Aurora Luxe Travel',
    description: '...',
    images: [{ url: 'https://...png', width: 1200, height: 630 }],
    url: 'https://auroraluxe.com',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@auroraluxe',
  },
};
```

#### Structured Data
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Aurora Luxe',
      url: 'https://auroraluxe.com',
      logo: 'https://auroraluxe.com/logo.png',
    }),
  }}
/>
```

#### Image Alt Text
```tsx
<Image
  src={hero}
  alt="Maldives luxury resort with overwater bungalows at sunset"
  fill
  priority
/>
```

---

## Performance Checklist

### Core Web Vitals Targets

| Metric | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse, PageSpeed |
| FID (First Input Delay) | < 100ms | Chrome DevTools |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |

### Next.js Optimization

```typescript
// next.config.js
export default {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};
```

### Image Strategy

- ✅ Use `next/image` (automatic optimization, responsive)
- ✅ Remote images: configure in `next.config.js`
- ✅ Lazy load images below fold: `loading="lazy"` or `<Image>`
- ✅ Use modern formats: AVIF > WebP > JPEG/PNG
- ✅ Responsive images: `srcSet` or `sizes` attribute

```tsx
<Image
  src="https://source.unsplash.com/featured/1200x900?luxury"
  alt="Luxury resort"
  width={1200}
  height={900}
  priority={isPriority}
  sizes="(max-width: 768px) 100vw, 80vw"
/>
```

### Code Splitting & Lazy Loading

```tsx
// Route-based code splitting (automatic in Next.js)
// app/dashboard/page.tsx – only loaded when user navigates to /dashboard

// Component-level code splitting
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <div>Loading...</div>,
});
```

### Remove Unused Code

- Audit Tailwind: use `purge` in config (production only)
- Remove unused fonts
- Tree-shake unused dependencies
- Check bundle size: `npm install -g webpack-bundle-analyzer`

---

## Image Strategy

### Using Free Remote Images

Prefer stable, free sources:

| Source | Type | Setup |
|--------|------|-------|
| [Unsplash](https://unsplash.com) | API + Source | `source.unsplash.com/featured/{w}x{h}?query` |
| [Pexels](https://pexels.com) | API | Requires key, but generous free tier |
| [Pixabay](https://pixabay.com) | API | Free, no attribution required |

### Example URLs (Stable)

```
Hero (2400x1400):
https://source.unsplash.com/featured/2400x1400?luxury,travel

Cards (1200x900):
https://source.unsplash.com/featured/1200x900?maldives,resort
https://source.unsplash.com/featured/1200x900?tokyo,night,skyline
https://source.unsplash.com/featured/1200x900?switzerland,alps,luxury
```

### Image Credits Footer

Always credit sources:

```tsx
<footer className="text-center text-sm text-surface-600 py-6">
  <p>
    Images via{' '}
    <a href="https://unsplash.com" className="underline hover:text-accent-cyan">
      Unsplash Source
    </a>
    {' '}and{' '}
    <a href="https://pexels.com" className="underline hover:text-accent-cyan">
      Pexels
    </a>
  </p>
</footer>
```

---

## Quality Assurance

### Pre-Launch Checklist

#### Visual & Design
- [ ] Typography scale consistent across breakpoints
- [ ] Color palette adhered to (no random colors)
- [ ] Spacing follows 4px grid
- [ ] All images have consistent radius/treatment
- [ ] No placeholder text (Lorem Ipsum removed)
- [ ] Buttons, links, inputs have clear visual hierarchy
- [ ] Hover/focus states visible and accessible
- [ ] Animations smooth (no jank)
- [ ] No console errors or warnings

#### Responsive
- [ ] Looks good on iPhone SE (375px), iPad (768px), Desktop (1920px+)
- [ ] Touch targets ≥ 44px on mobile
- [ ] Text readable without zooming
- [ ] Horizontal scroll on mobile = 0

#### Accessibility
- [ ] All images have alt text
- [ ] Headings hierarchy: H1 → H2 → H3 (no skipping)
- [ ] Form inputs have associated labels
- [ ] Focus order follows content order (Tab key)
- [ ] Color not sole differentiator (text + icon)
- [ ] Contrast ≥ 4.5:1 (WCAG AA)
- [ ] Tested with keyboard only (Tab, Enter, Escape, arrows)
- [ ] Tested with screen reader (VoiceOver / NVDA)

#### Performance
- [ ] LCP < 2.5s (Lighthouse)
- [ ] No CLS (Cumulative Layout Shift = 0)
- [ ] Images optimized (next/image, modern formats)
- [ ] Bundle size reasonable (analyze with webpack)
- [ ] No 3rd-party scripts blocking page render
- [ ] Lighthouse score ≥ 90 (Performance)

#### SEO
- [ ] Meta title, description set
- [ ] OpenGraph image configured
- [ ] Canonical URL set
- [ ] Robots.txt, sitemap.xml in place
- [ ] Structured data (JSON-LD) for rich results

#### Code Quality
- [ ] TypeScript strict mode, no `any`
- [ ] ESLint + Prettier applied
- [ ] No unused imports or variables
- [ ] Components decomposed logically
- [ ] No hardcoded strings (use constants or i18n)
- [ ] Error boundaries / error states implemented
- [ ] Loading states for async operations
- [ ] Env variables documented (.env.example)

#### Testing
- [ ] Manual testing on target devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Dark mode tested (if implemented)
- [ ] Print CSS tested (if applicable)

---

## References

### See Bundled Resources For:

- **`references/design-tokens.md`** – Tailwind config templates, color systems
- **`references/component-patterns.md`** – Reusable component code snippets
- **`references/performance-checklist.md`** – Detailed optimization techniques
- **`references/accessibility-guide.md`** – WCAG 2.1 deep dive + testing tools
- **`references/framework-comparison.md`** – Next.js vs Vue vs Svelte detailed guide

### External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Web.dev Performance Guide](https://web.dev/performance)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Web Docs](https://developer.mozilla.org)

---

## When to Use This Skill

✅ **Perfect for:**
- Landing pages (SaaS, agencies, personal brands)
- Admin dashboards
- E-commerce product pages
- Portfolio sites
- Internal tools
- Promotional campaigns
- Component libraries
- Design system documentation

✅ **Triggers:**
- "Build a landing page for..."
- "Create a SaaS dashboard"
- "Design a professional website"
- "Make a portfolio site"
- "Build a luxury e-commerce store"
- "Create an admin panel"

---

## Workflow Summary

1. **Choose a framework** (Next.js default, or Vue/Svelte if preferred)
2. **Create project** using official templates
3. **Set up design system** (colors, typography, spacing via Tailwind config)
4. **Build atomic components** (UI atoms, molecules, organisms)
5. **Implement animations** using framework-specific tools
6. **Ensure accessibility** (semantic HTML, ARIA, keyboard nav)
7. **Optimize images** (next/image, remote sources, modern formats)
8. **Test responsiveness** (mobile-first, all breakpoints)
9. **Run QA checklist** (visual, perf, a11y, SEO)
10. **Deploy** with performance monitoring

---

**Last Updated:** 2025 | **Version:** 1.0
