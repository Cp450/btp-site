# Performance Optimization Checklist

Detailed optimization techniques for production-ready frontends.

## Web Vitals Targeting

### Lighthouse Metrics

| Metric | Target | Weight | Importance |
|--------|--------|--------|------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 25% | CRITICAL – slowest element render |
| **FID** (First Input Delay) | < 100ms | 5% | Main thread responsiveness |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 5% | Visual stability during load |
| **TTL** (Time to Largest Byte) | < 3s | – | Asset delivery |
| **FCP** (First Contentful Paint) | < 1.8s | – | Perceived load time |

### Measuring

```bash
# Lighthouse CLI
npm install -g @lhci/cli@latest
lhci autorun

# PageSpeed Insights
npx psi <your-domain>

# Manual: Chrome DevTools → Performance tab
# Record → Analyze (LCP, FID, CLS highlighted)
```

---

## Image Optimization

### Problem
- Unoptimized images = 50%+ of page weight
- Slow LCP due to lazy loading hero images
- Serving desktop images to mobile users

### Solution

#### Use next/image (Next.js)

```typescript
import Image from 'next/image';

<Image
  src="https://source.unsplash.com/featured/1200x900?travel"
  alt="Luxury travel destination"
  width={1200}
  height={900}
  priority={isAboveTheFold}  // LCP element
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
  loading={isAboveTheFold ? 'eager' : 'lazy'}
  quality={75}  // JPEG quality 75 = imperceptible quality loss
/>
```

#### Configure Remote Domains

```typescript
// next.config.js
export default {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
    formats: ['image/avif', 'image/webp'],  // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

#### Image Sizing Best Practices

```tsx
// Hero images (above the fold)
<Image width={1920} height={1080} priority sizes="100vw" />

// Card images (multiple per viewport)
<Image width={600} height={400} sizes="(max-width: 768px) 100vw, 50vw" />

// Thumbnails (many per viewport)
<Image width={300} height={300} sizes="(max-width: 768px) 50vw, 25vw" />
```

**Result:** 2x-4x size reduction; automatic format selection

---

## JavaScript Code Splitting

### Problem
- Bundle all JS upfront = slow FCP/LCP
- Unused code on every page

### Solution

#### Route-Based Splitting (Automatic in Next.js)

```
✅ Each route only loads its own JS
✅ app/dashboard/page.tsx → separate bundle from app/page.tsx
✅ No config needed
```

#### Component-Level Splitting

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const DataTable = dynamic(() => import('@/components/DataTable'), {
  loading: () => <TableSkeleton />,
  ssr: false,  // If component uses browser APIs
});

// Lazy load route-specific components
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  ssr: false,
});

// Usage – loads only when needed
<Suspense fallback={<TableSkeleton />}>
  <DataTable />
</Suspense>
```

#### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

**Target:** Main bundle < 200KB gzipped

---

## Font Optimization

### Problem
- System fonts = no FOUT/FOIT
- Web fonts = invisible text during load

### Solution

```typescript
// app/layout.tsx
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',  // Fallback immediately, swap when ready
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// In CSS
@font-face {
  font-family: 'SpaceGrotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

**Result:** No font delay; system font as fallback

---

## CSS Optimization

### Problem
- Tailwind CSS can be 1MB+ if unconfigured
- Unused styles bloat CSS

### Solution

#### Purge Unused CSS (Tailwind)

```typescript
// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Only if dynamic classes needed
    {
      pattern: /^bg-(red|green|blue)-(50|100|200)$/,
    },
  ],
};
```

**Result:** 50KB+ CSS reduction

#### Critical CSS

```typescript
// Next.js automatically extracts critical CSS above-the-fold
// No manual work needed; just use Tailwind + purging
```

---

## Third-Party Script Optimization

### Problem
- Google Analytics, Stripe, Intercom = main thread blocking
- Delays interactivity

### Solution

```tsx
// pages/_document.tsx (Next.js Pages Router)
// or use Script component (App Router)

import { Analytics } from '@vercel/analytics/react';

// In App Router (preferred)
import Script from 'next/script';

export default function RootLayout() {
  return (
    <html>
      <body>
        {/* App content */}
        {/* Load analytics asynchronously */}
        <Analytics />
        
        {/* Load other scripts */}
        <Script
          src="https://cdn.example.com/sdk.js"
          strategy="lazyOnload"  // Load after page interactive
        />
      </body>
    </html>
  );
}
```

**Strategies:**
- `beforeInteractive` – Critical scripts only (payment)
- `afterInteractive` – Default (analytics)
- `lazyOnload` – Non-blocking (chat widgets)

---

## Caching Strategy

### HTTP Cache Headers

```typescript
// next.config.js
export default {
  headers: async () => {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',  // 1 year
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};
```

### Service Worker (Optional)

```typescript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/index.html', '/styles.css', '/app.js']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---

## Database & API Optimization

### Problem
- Slow API calls = slow LCP
- N+1 queries

### Solution

#### ISR (Incremental Static Regeneration) in Next.js

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600;  // Revalidate every hour

export async function generateStaticParams() {
  const posts = await db.posts.findMany();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await db.posts.findUnique({ where: { slug: params.slug } });
  return <div>{post.title}</div>;
}
```

**Result:** Static HTML served instantly + background revalidation

#### API Caching

```typescript
// app/api/destinations/route.ts
export const revalidate = 3600;

export async function GET(request: Request) {
  const data = await fetch('https://api.example.com/destinations', {
    next: { revalidate: 3600 },  // Cache for 1 hour
  });
  return Response.json(data);
}
```

---

## Network Optimization

### Problem
- Large payloads over slow networks
- Unnecessary requests

### Solution

#### Compression

```typescript
// next.config.js
export default {
  compress: true,  // Gzip by default
};
```

#### Minification

```typescript
// Automatic in production builds
// .next/static/chunks/main-HASH.js (minified)
```

#### Request Deduplication

```typescript
// lib/api.ts – Deduplicate identical requests
const cache = new Map();

export async function fetchJSON(url: string) {
  if (cache.has(url)) return cache.get(url);
  
  const data = await fetch(url).then((r) => r.json());
  cache.set(url, data);
  return data;
}
```

---

## Runtime Optimization

### Problem
- JavaScript execution = janky animations
- Main thread blocking

### Solution

#### Use requestAnimationFrame (RAG)

```typescript
// Smooth animations
let animationId: number;

function animate() {
  // Update position, rotation, etc.
  animationId = requestAnimationFrame(animate);
}

animate();
```

#### Defer Heavy Work

```typescript
// Framer Motion handles this automatically
// For custom work, use Web Workers

// worker.js
self.onmessage = (event) => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};

// main.ts
const worker = new Worker('worker.js');
worker.postMessage(largeDataset);
worker.onmessage = (event) => console.log(event.data);
```

#### React Transitions (Concurrent Features)

```typescript
// Next.js 13+ with App Router
import { useTransition } from 'react';

export function FilterButton() {
  const [isPending, startTransition] = useTransition();
  
  const handleFilter = (filter: string) => {
    startTransition(() => {
      updateResults(filter);  // Non-blocking
    });
  };
  
  return (
    <button disabled={isPending} onClick={() => handleFilter('luxury')}>
      {isPending ? 'Loading...' : 'Filter'}
    </button>
  );
}
```

---

## Pre-Launch Performance Checklist

- [ ] Lighthouse score ≥ 90 (Performance)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Bundle size < 200KB (JS)
- [ ] CSS < 50KB
- [ ] All images optimized (next/image)
- [ ] Third-party scripts deferred
- [ ] Cache headers configured
- [ ] No console errors
- [ ] Core Web Vitals green on PageSpeed Insights

---

## Monitoring

```typescript
// Integrate Web Vitals
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to your analytics backend
  fetch('/api/metrics', { method: 'POST', body: JSON.stringify(metric) });
}

getCLS(sendToAnalytics);
getFCP(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

**Platforms:**
- Vercel Analytics (free with Vercel)
- Google Analytics (free)
- Datadog (paid, recommended for enterprises)

---

**Apply these techniques systematically. Target 90+ Lighthouse score.**
