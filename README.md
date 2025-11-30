# QuestBits - Daily Habit Tracker PWA

A Progressive Web App for tracking micro-habits (daily quests) with gamification elements. Built with React, TypeScript, and modern web technologies.

![QuestBits](public/icon-512.png)

**Tagline:** daily quests, tiny wins

## Features

- ✅ **Habit Tracking**: Add up to 10 daily habits (quests)
- 🎯 **Daily Logging**: Track habit completion with one-click logging
- ⭐ **Points & Levels**: Earn 10 points per log, level up every 100 points
- 🏆 **Badge System**: Unlock badges at 50, 150, and 300 points
- 📊 **30-Day Chart**: Visualize your progress with a custom bar chart
- 🌍 **Internationalization**: English and Norwegian (Bokmål) support
- 💾 **Offline-First**: IndexedDB + localStorage with optional encryption
- 📱 **PWA**: Installable, works offline, app-like experience
- ♿ **Accessible**: WCAG AA compliant with ARIA attributes
- 🎨 **Beautiful UI**: Pixel-art aesthetic with modern design

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State**: React Context + useReducer
- **Storage**: IndexedDB (idb-keyval), localStorage fallback
- **Charts**: Custom HTML/CSS bar chart
- **i18n**: react-i18next
- **PWA**: vite-plugin-pwa, Workbox
- **Icons**: Lucide React
- **Build**: Vite (fast, optimized builds)

## Getting Started

### Prerequisites

- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd questbits

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Project Structure

```
questbits/
├── public/
│   ├── icon-192.png        # PWA icon (192x192)
│   ├── icon-512.png        # PWA icon (512x512)
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
├── src/
│   ├── assets/             # Images and static assets
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── StatsCard.tsx
│   │   ├── HabitCard.tsx
│   │   ├── AddHabitDialog.tsx
│   │   ├── BadgesModal.tsx
│   │   └── SimpleProgressChart.tsx
│   ├── context/           # React Context for state management
│   │   └── AppContext.tsx
│   ├── i18n/              # Internationalization
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json    # English translations
│   │       └── nb.json    # Norwegian translations
│   ├── lib/               # Utilities and helpers
│   │   ├── storage.ts     # IndexedDB + localStorage
│   │   ├── badges.ts      # Badge logic
│   │   ├── dateUtils.ts   # Date formatting
│   │   └── utils.ts
│   ├── pages/             # Route pages
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx           # App entry point + SW registration
│   └── index.css          # Global styles + design system
├── index.html
├── vite.config.ts         # Vite + PWA configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## Usage Guide

### Adding Habits

1. Click "Add New Quest" button
2. Enter a habit name (max 50 characters)
3. Click "Add Quest"
4. Maximum 10 habits allowed

### Logging Habits

1. Click the "Log" button next to any habit
2. Earns 10 points immediately
3. Button changes to "Logged!" and becomes disabled for the day
4. Progress is automatically saved

### Viewing Progress

- **Stats Cards**: View total points and current level at the top
- **30-Day Chart**: Scroll down to see daily habit completion over time
- **Badges**: Click "View Badges" to see earned and locked badges

### Language Settings

- Click the globe icon in the header
- Select English or Norwegian (Norsk)
- Settings persist across sessions

## PWA Installation

### On Mobile (iOS/Android)

1. Open the app in your mobile browser
2. Tap the share/menu button
3. Select "Add to Home Screen"
4. The app will work offline and feel native

### On Desktop (Chrome/Edge)

1. Click the install icon in the address bar
2. Or go to browser menu → "Install QuestBits"
3. App opens in its own window

## Storage & Data

- **Primary**: IndexedDB for structured, efficient storage
- **Fallback**: localStorage for compatibility
- **Encryption**: Optional Web Crypto API (AES-GCM) available
- **Privacy**: All data stays local - no servers, no tracking

## Deployment

### Netlify

```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

Or use the included `netlify.toml` (if present) for automatic deployments.

### Vercel

```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

Or connect your Git repository for automatic deployments.

### Other Static Hosts

Build the project and deploy the `dist` folder to any static hosting provider:

```bash
npm run build
# Upload 'dist' folder to your hosting provider
```

## Performance

- **Bundle Size**: < 150 KB gzipped (target)
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Offline Support**: Full offline functionality with service worker
- **Lazy Loading**: Code splitting for optimal load times

## Accessibility

- WCAG AA compliant
- Full keyboard navigation support
- ARIA labels and roles
- High contrast colors
- Screen reader tested

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Contributing

This is a learning/portfolio project, but feel free to fork and modify for your own use!

## License

MIT License - feel free to use this project however you'd like.

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Treasure chest icon generated with AI

---

**Happy questing! 🎮✨**
