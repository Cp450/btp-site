# Design Tokens & System

Complete, copy-paste ready design system configs for Tailwind CSS.

## Table of Contents

- [Luxury/Premium System](#luxurypremium-system)
- [Minimal/Clean System](#minimalclean-system)
- [Corporate System](#corporate-system)
- [Tech/Playful System](#techplayful-system)
- [Warm/Organic System](#warmorganic-system)
- [Shared Utilities](#shared-utilities)

---

## Luxury/Premium System

**Use for:** High-end services, travel, finance, fashion

### Colors

```typescript
// tailwind.config.ts - Luxury Palette
{
  colors: {
    // Base
    surface: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#efefef',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      950: '#0a0a0a',
    },
    // Accents
    cyan: {
      400: '#00d4ff',
      500: '#00c7f2',
      600: '#00b4d8',
    },
    purple: {
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
    },
    magenta: {
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
    },
    // Accents (supporting)
    gold: {
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
    },
    white: '#ffffff',
    black: '#000000',
  },
  backgroundColor: {
    'glass': 'rgba(255, 255, 255, 0.05)',
    'glass-hover': 'rgba(255, 255, 255, 0.08)',
    'glass-dark': 'rgba(0, 0, 0, 0.4)',
    'glow-cyan': 'rgba(0, 212, 255, 0.1)',
  },
  backdropBlur: {
    'xs': '2px',
    'sm': '4px',
    'md': '8px',
  },
}
```

### Typography

```typescript
// tailwind.config.ts - Fonts
{
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'system-ui', 'sans-serif'],
    mono: ['Space Mono', 'monospace'],
  },
  fontSize: {
    // Headings
    'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
    'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
    'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
    'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
    // Body
    'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    'body-xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
    // Display
    'display': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
  },
}
```

### Import Fonts in layout.tsx

```typescript
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

// In root element:
<body className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
  ...
</body>
```

### Shadows & Glows

```typescript
{
  boxShadow: {
    'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'base': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    'lg': '0 10px 40px rgb(0 0 0 / 0.2)',
    'xl': '0 20px 60px rgb(0 0 0 / 0.3)',
    'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
    'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
  },
}
```

### Gradients

```typescript
{
  backgroundImage: {
    'gradient-aurora': 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #ec4899 100%)',
    'gradient-subtle': 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
  },
}
```

---

## Minimal/Clean System

**Use for:** SaaS, productivity tools, corporate, minimalist portfolios

### Colors

```typescript
{
  colors: {
    surface: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      // ... standard grayscale
      950: '#030712',
    },
    accent: {
      blue: '#3b82f6',
      indigo: '#4f46e5',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
}
```

### Typography

```typescript
{
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['SF Mono', 'monospace'],
  },
}
```

### Spacing & Radius

Stricter grid for clean aesthetics:

```typescript
{
  spacing: {
    // Use 8px grid strictly
    '1': '0.25rem',  // 4px
    '2': '0.5rem',   // 8px
    '3': '0.75rem',  // 12px
    '4': '1rem',     // 16px
    // ...
  },
  borderRadius: {
    'none': '0',
    'sm': '0.375rem',
    'base': '0.5rem',
    'md': '0.75rem',
    'lg': '1rem',
  },
}
```

---

## Corporate System

**Use for:** B2B, consulting, enterprise

### Colors

```typescript
{
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#0ea5e9',
      900: '#082f49',
    },
    secondary: {
      500: '#64748b',
    },
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
  },
}
```

### Typography

```typescript
{
  fontFamily: {
    sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
}
```

---

## Tech/Playful System

**Use for:** Startups, dev tools, gaming, fun brands

### Colors

```typescript
{
  colors: {
    surface: {
      900: '#0f172a',
      950: '#020617',
    },
    // Neon/vibrant accents
    lime: '#84cc16',
    cyan: '#06b6d4',
    pink: '#ec4899',
    orange: '#f97316',
  },
  backgroundImage: {
    'gradient-neon': 'linear-gradient(90deg, #84cc16 0%, #06b6d4 50%, #f97316 100%)',
  },
}
```

### Animations

Use snappy, energetic timing:

```typescript
{
  transitionDuration: {
    '100': '100ms',
    '200': '200ms',
    '300': '300ms',
  },
  keyframes: {
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    bounce: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-0.5rem)' },
    },
  },
}
```

---

## Warm/Organic System

**Use for:** E-commerce (lifestyle), wellness, organic brands

### Colors

```typescript
{
  colors: {
    sand: {
      50: '#faf8f3',
      100: '#ede6d3',
      200: '#d4bfb8',
    },
    clay: {
      500: '#a07860',
      600: '#8b6a47',
    },
    sage: {
      500: '#9ca582',
    },
    terracotta: {
      500: '#e07856',
    },
  },
}
```

### Typography

```typescript
{
  fontFamily: {
    sans: ['Sohne', 'system-ui', 'sans-serif'],
    display: ['Publico Headline', 'serif'],
  },
}
```

---

## Shared Utilities

### Tailwind Config Snippet (All Systems)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Choose ONE color palette above
      colors: {
        // ... paste chosen system here
      },
      fontFamily: {
        // ... paste chosen fonts here
      },
      spacing: {
        // Custom if needed
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        // ... paste chosen shadows here
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### Classname Utility (All Systems)

```typescript
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Global Styles

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: Custom base styles */
@layer base {
  body {
    @apply bg-surface-950 text-surface-50 antialiased;
  }
  
  h1 { @apply font-display text-h1; }
  h2 { @apply font-display text-h2; }
  h3 { @apply font-display text-h3; }
  
  a {
    @apply transition-colors focus-visible:outline-2 outline-offset-2;
  }
}

/* Accessible focus visible */
@layer components {
  .focus-ring {
    @apply focus-visible:outline-2 outline-offset-2 outline-accent-cyan;
  }
  
  .glass-panel {
    @apply rounded-2xl border border-surface-800 bg-glass backdrop-blur-md;
  }
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

**Copy-paste the system matching your aesthetic into `tailwind.config.ts` and customize as needed.**
