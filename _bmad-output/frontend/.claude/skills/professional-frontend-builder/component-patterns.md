# Component Patterns & Snippets

Production-ready component code across frameworks. Adapt to your tech stack.

## Table of Contents

- [React/Next.js](#reactnextjs)
  - [Button](#button)
  - [Card](#card)
  - [Input](#input)
  - [Hero Section](#hero-section)
  - [Grid of Items](#grid-of-items)
  - [Navbar](#navbar)
- [Vue 3](#vue-3)
  - [Button](#button-1)
  - [Card](#card-1)
- [Svelte](#svelte)
  - [Button](#button-2)
- [Shared Patterns](#shared-patterns)

---

## React/Next.js

### Button

```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-2 outline-offset-2 focus-visible:outline-accent-cyan',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Size variants
          size === 'sm' && 'px-3 py-1.5 text-sm rounded-lg',
          size === 'md' && 'px-4 py-2.5 text-base rounded-lg',
          size === 'lg' && 'px-6 py-3 text-lg rounded-lg',
          // Color variants
          variant === 'primary' && [
            'bg-gradient-to-r from-cyan-400 to-purple-500 text-black',
            'hover:shadow-lg hover:shadow-cyan-400/30',
          ],
          variant === 'secondary' && [
            'bg-surface-900 text-white border border-surface-700',
            'hover:border-surface-600 hover:bg-surface-800',
          ],
          variant === 'ghost' && [
            'text-accent-cyan',
            'hover:bg-surface-900/50',
          ],
          variant === 'outline' && [
            'border border-accent-cyan text-accent-cyan',
            'hover:bg-surface-900/50',
          ],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="absolute h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className={isLoading ? 'invisible' : 'visible'}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

### Card

```tsx
// components/ui/Card.tsx
import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated';
}

export function Card({
  className,
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-surface-800',
        variant === 'default' && 'bg-glass backdrop-blur-md p-6',
        variant === 'interactive' && [
          'bg-glass backdrop-blur-md p-6',
          'cursor-pointer transition-all duration-300',
          'hover:border-accent-cyan hover:shadow-lg hover:shadow-cyan-400/20',
          'hover:-translate-y-1',
        ],
        variant === 'elevated' && [
          'bg-gradient-to-br from-surface-800 to-surface-900 p-6',
          'shadow-lg shadow-black/50',
        ],
        className
      )}
      {...props}
    />
  );
}
```

### Input

```tsx
// components/ui/Input.tsx
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg bg-surface-900 text-white',
            'border border-surface-700 transition-all duration-200',
            'placeholder:text-surface-600',
            'focus-visible:outline-none focus-visible:border-accent-cyan',
            'focus-visible:shadow-lg focus-visible:shadow-cyan-400/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus-visible:shadow-red-400/20',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
        {icon && <span className="absolute left-3 top-2.5 text-surface-600">{icon}</span>}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

### Hero Section

```tsx
// components/sections/Hero.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://source.unsplash.com/featured/2400x1400?luxury,travel"
        alt="Luxury travel destination"
        fill
        className="absolute inset-0 object-cover -z-10"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent -z-5" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Aurora Glow Background */}
        <motion.div
          className="absolute inset-0 -z-5 blur-3xl"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
              'radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
              'radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
          Beyond First Class
        </h1>

        <p className="text-lg sm:text-xl text-surface-300 mb-8 max-w-2xl mx-auto">
          Ultra-premium, bespoke luxury travel experiences curated for the discerning traveler.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" variant="primary">
            Design My Trip
          </Button>
          <Button size="lg" variant="secondary">
            Explore Destinations
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
```

### Grid of Items

```tsx
// components/sections/DestinationGrid.tsx
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';

interface Destination {
  id: string;
  name: string;
  region: string;
  vibe: string;
  price: number;
  image: string;
}

export function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-display font-bold mb-4 text-center">
        Signature Destinations
      </h2>
      <p className="text-center text-surface-400 mb-12 max-w-2xl mx-auto">
        Handpicked locations for discerning travelers
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        {destinations.map((dest) => (
          <motion.div key={dest.id} variants={itemVariants}>
            <Card variant="interactive" className="overflow-hidden h-full">
              <div className="relative h-48 mb-4 -m-6 mb-4">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
              <p className="text-surface-400 mb-2">{dest.region}</p>
              <p className="text-accent-cyan mb-4">{dest.vibe}</p>
              <p className="text-lg font-bold">from €{dest.price.toLocaleString()}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

### Navbar

```tsx
// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Membership', href: '#membership' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-surface-950/80 backdrop-blur-md border-b border-surface-800" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-display font-bold">
            Aurora <span className="text-accent-cyan">Luxe</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-surface-300 hover:text-accent-cyan transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button variant="primary" size="sm">
              Request Itinerary
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-surface-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-surface-300 hover:text-accent-cyan"
              >
                {item.name}
              </Link>
            ))}
            <Button variant="primary" className="w-full">
              Request Itinerary
            </Button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
```

---

## Vue 3

### Button

```vue
<!-- components/Button.vue -->
<template>
  <button
    :class="[
      'px-4 py-2 font-medium rounded-lg transition-all',
      'focus-visible:outline-2 outline-offset-2 outline-accent-cyan',
      variantClasses,
      sizeClasses,
    ]"
    :disabled="isLoading || disabled"
  >
    <svg
      v-if="isLoading"
      class="absolute h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75" />
    </svg>
    <span :class="{ invisible: isLoading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:shadow-lg';
    case 'secondary':
      return 'bg-surface-900 text-white border border-surface-700 hover:bg-surface-800';
    case 'ghost':
      return 'text-accent-cyan hover:bg-surface-900/50';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm';
    case 'lg':
      return 'px-6 py-3 text-lg';
    default:
      return 'px-4 py-2 text-base';
  }
});
</script>
```

### Card

```vue
<!-- components/Card.vue -->
<template>
  <div
    :class="[
      'rounded-2xl border border-surface-800',
      variantClasses,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'interactive' | 'elevated';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'interactive':
      return 'bg-glass backdrop-blur-md p-6 cursor-pointer hover:border-accent-cyan hover:shadow-lg transition-all hover:-translate-y-1';
    case 'elevated':
      return 'bg-gradient-to-br from-surface-800 to-surface-900 p-6 shadow-lg';
    default:
      return 'bg-glass backdrop-blur-md p-6';
  }
});
</script>
```

---

## Svelte

### Button

```svelte
<!-- lib/Button.svelte -->
<script lang="ts">
  import { cn } from '$lib/cn';

  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let isLoading = false;
  export let disabled = false;

  let className = '';
  export { className as class };

  const variantMap = {
    primary: 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:shadow-lg',
    secondary: 'bg-surface-900 text-white border border-surface-700 hover:bg-surface-800',
    ghost: 'text-accent-cyan hover:bg-surface-900/50',
  };

  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
</script>

<button
  {disabled}
  class={cn(
    'font-medium transition-all rounded-lg focus-visible:outline-2 outline-offset-2',
    variantMap[variant],
    sizeMap[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )}
  on:click
>
  {#if isLoading}
    <svg class="absolute h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
      <path fill="currentColor" d="..." class="opacity-75" />
    </svg>
    <span class="invisible"><slot /></span>
  {:else}
    <slot />
  {/if}
</button>
```

---

## Shared Patterns

### Form Handling

```typescript
// lib/useForm.ts (React/Next.js)
import { useState, FormEvent } from 'react';

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    return async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  return { values, errors, setErrors, isSubmitting, handleChange, handleSubmit };
}
```

### Scroll Reveal Animation (Framer Motion)

```typescript
// lib/useInView.ts
import { useInView } from 'react-intersection-observer';

export function useRevealOnScroll() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return { ref, inView };
}

// Usage:
// const { ref, inView } = useRevealOnScroll();
// <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} />
```

---

**Choose your framework and copy-paste the patterns above. Adapt classnames and syntax as needed.**
